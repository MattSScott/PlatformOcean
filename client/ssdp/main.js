const dgram = require("dgram");
const express = require("express");
const cors = require("cors");

const multicastAddress = "230.185.192.108";
const multicastPort = 9001;
const responsePort = 9002;
const discoveryMessage = Buffer.from("PlatformOceanDiscovery");

const discoveredServers = new Map();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://your-react-app-domain.com"], // Adjust this for your React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Create a UDP socket for sending multicast messages and receiving responses
const multicastSocket = dgram.createSocket("udp4");

// Periodically send discovery messages
setInterval(() => {
  multicastSocket.send(
    discoveryMessage,
    multicastPort,
    multicastAddress,
    (err) => {
      if (err) console.error("Error sending multicast message:", err);
    }
  );
}, 5000); // Send discovery every 5 seconds

multicastSocket.bind(responsePort, () => {
  console.log(`Listening for server responses on port ${responsePort}`);
  // Listen for responses from servers
  multicastSocket.on("message", (msg) => {
    const serverDetails = JSON.parse(msg.toString()); // Assuming server sends details as a string
    if (!serverDetails.platformIP) return;
    const serverKey = serverDetails.platformIP;
    if (!discoveredServers.has(serverKey)) {
      console.log(`Discovered server: ${serverKey}`);
      discoveredServers.set(serverKey, serverDetails.platformName);
    }
  });
});

// API endpoint to expose discovered servers
app.get("/discovered-servers", (_, res) => {
  res.json(Array.from(discoveredServers));
});

// Start the Express server
const port = 3142;
app.listen(port, () => {
  console.log(`Middleware API running on http://localhost:${port}`);
});

// Close sockets on exit
process.on("SIGINT", () => {
  multicastSocket.close();
  console.log("Socket closed, exiting...");
  process.exit();
});

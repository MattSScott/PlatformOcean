import java.net.*;
import java.io.*;

public class Server extends Thread {

    private Thread serverInstance;
    private String serverName;
    private Socket client;
    private PrintWriter out;
    private BufferedReader in;
    private final Gateway gateway;

    Server(Socket client, String clientName, Gateway gateway) throws IOException {
        this.serverName = clientName;
        this.client = client;
        this.gateway = gateway;
        System.out.println("Creating server for " + this.serverName);
        try {
            this.out = new PrintWriter(this.client.getOutputStream(), true);
            this.in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));
        } catch (IOException e) {
            this.out.close();
            this.in.close();
            e.printStackTrace();
        }
    }

    public void run() {
        try {
            CS_Protocol csp = new CS_Protocol();
            String inputLine;
            Message outputMsg = csp.parseMsg("ONLINE");
            String outputLine = outputMsg.getParsed();
            this.out.println(outputLine);

            this.broadcast("Server: " + this.serverName + " joined", true);

            while ((inputLine = this.in.readLine()) != null) {
                outputMsg = csp.parseMsg(inputLine);
                outputLine = this.serverName + ": " + outputMsg.getParsed();

                if (outputMsg.isGlobal()) {
                    this.broadcast(outputLine, true);
                } else {
                    this.out.println(outputLine);
                }
                if (outputMsg.getParsed().equals("bye")) {
                    this.broadcast(this.serverName + " disconnected.", false);
                    System.out.println("Client disconnected (" + this.serverName + ").");
                    break;
                }
            }

            this.out.close();
            this.in.close();
            this.client.close();
        }

        catch (IOException e) {
            System.out.println(e);
        }
    }

    public void broadcast(String msg, boolean toAll) {
        for (Server s : this.gateway.requestAllThreads()) {
            if (toAll || !s.equals(this)) {
                s.sendMessage(msg);
            }
        }
    }

    public void sendMessage(String msg) {
        this.out.println(msg);
    }

    public void start() {
        System.out.println("Starting " + this.serverName);
        if (this.serverInstance == null) {
            this.serverInstance = new Thread(this, this.serverName);
            this.serverInstance.start();
        }
    }
}
import java.net.*;
import java.io.*;
import java.util.UUID;

public class Server extends Thread {

    private Thread serverInstance;
    private String clientName;
    private Socket client;
    private PrintWriter out;
    private BufferedReader in;
    private final String serverName;
    private final Gateway gateway;

    Server(Socket client, Gateway gateway) throws IOException {
        this.client = client;
        this.gateway = gateway;
        this.serverName = UUID.randomUUID().toString();
        System.out.println("Creating server with alias: " + this.serverName);
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
            final CS_Protocol csp = new CS_Protocol();
            String inputLine;
            Message outputMsg = csp.parseMsg("Server: ONLINE");
            String outputLine = outputMsg.getParsed();
            this.sendMessage(outputLine);

            this.sendMessage("Server: Enter username:");
            this.clientName = this.in.readLine();

            this.broadcast("Server: " + this.clientName + " joined", true);

            this.sendMessage("Server: Type '!c help' for a list of commands.");

            while ((inputLine = this.in.readLine()) != null) {
                outputMsg = csp.parseMsg(inputLine);
                outputLine = this.clientName + ": " + outputMsg.getParsed();

                if (outputMsg.isGlobal()) {
                    this.broadcast(outputLine, true);
                } else if (outputMsg.isCommList()) {
                    this.sendMessage("!g: Send global message\n!r: rename user");
                } else if (outputMsg.isRename()) {
                    this.broadcast(this.clientName + " renamed themselves to: " + outputMsg.getParsed(), true);
                    this.clientName = outputMsg.getParsed();
                } else {
                    this.sendMessage(outputLine);
                }
                if (outputMsg.getParsed().equals("bye")) {
                    this.broadcast(this.clientName + " disconnected.", false);
                    System.out.println("Client disconnected (" + this.clientName + ").");
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
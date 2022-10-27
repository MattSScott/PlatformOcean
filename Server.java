import java.net.*;
import java.io.*;

public class Server extends Thread {

    private Thread serverInstance;
    private String serverName;
    private Socket client;

    Server(Socket client, String clientName) {
        this.serverName = clientName;
        this.client = client;
        System.out.println("Creating server for " + this.serverName);
    }

    public void run() {

        try (

                PrintWriter out = new PrintWriter(this.client.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));) {
            CS_Protocol csp = new CS_Protocol();
            String inputLine;
            Message outputMsg = csp.parseMsg("ONLINE");
            String outputLine = outputMsg.getParsed();
            out.println(outputLine);

            while ((inputLine = in.readLine()) != null) {
                outputMsg = csp.parseMsg(inputLine);
                outputLine = outputMsg.getParsed();
                out.println(outputLine);
                if (outputLine.equals("bye!")) {
                    System.out.println("Client disconnected.");
                    break;
                }
            }

            out.close();
            in.close();
            this.client.close();
        }

        catch (IOException e) {
            System.out.println(e);
        }
    }

    public void start() {
        System.out.println("Starting " + this.serverName);
        if (this.serverInstance == null) {
            this.serverInstance = new Thread(this, this.serverName);
            this.serverInstance.start();
        }
    }
}
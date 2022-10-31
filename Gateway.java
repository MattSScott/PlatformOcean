import java.net.*;
import java.io.*;
import java.util.ArrayList;

public class Gateway {

    private final ArrayList<Server> allThreads = new ArrayList<Server>();
    private final int PORT_NUMBER;

    Gateway(int PN) {
        this.PORT_NUMBER = PN;
    }

    public static void main(String[] args) throws IOException {

        final int PORT_NUMBER;

        if (args.length == 0) {
            PORT_NUMBER = 1337;
        } else {
            PORT_NUMBER = Integer.parseInt(args[0]);

        }

        Gateway gateway = new Gateway(PORT_NUMBER);
        gateway.startServer();
    }

    public ArrayList<Server> requestAllThreads() {
        return this.allThreads;
    }

    public void startServer() {
        System.out.println("Gateway opened on port: " + this.PORT_NUMBER);

        try (ServerSocket serverSocket = new ServerSocket(this.PORT_NUMBER)) {
            while (true) {
                Socket clientSocket = null;
                clientSocket = serverSocket.accept();
                if (clientSocket.isConnected()) {
                    BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                    String clientName = in.readLine();
                    System.out.println("Client connected (" + clientName + ").");
                    Server pathway = new Server(clientSocket, clientName, this);
                    this.allThreads.add(pathway);
                    pathway.start();
                }
            }
        } catch (IOException e) {
            System.out.println("Accept failed, " + e);
            System.exit(1);
        }
    }
}

// https://www.youtube.com/watch?v=bnxOMzxwayE
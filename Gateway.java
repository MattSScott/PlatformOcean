import java.net.*;
import java.io.*;

public class Gateway {

    public static void main(String[] args) throws IOException {

        int numCli = 0;
        final int PORT_NUMBER;

        if (args.length == 0) {
            PORT_NUMBER = 1337;
        } else {
            PORT_NUMBER = Integer.parseInt(args[0]);

        }

        System.out.println("Gateway opened on port: " + PORT_NUMBER);

        ServerSocket serverSocket = new ServerSocket(PORT_NUMBER);

        while (true) {

            Socket clientSocket = null;
            try {
                clientSocket = serverSocket.accept();
                if (clientSocket.isConnected()) {
                    System.out.println("Client connected.");
                    numCli += 1;
                    Server pathway = new Server(clientSocket, "server_" + String.valueOf(numCli));
                    pathway.start();
                }
            } catch (IOException e) {
                System.out.println("Accept failed, " + e);
                serverSocket.close();
                System.exit(1);
            }

        }
    }
}

import java.io.*;
import java.net.*;
import java.util.*;

public class PO_Client {
    public static void main(String[] args) throws IOException {
        final String HOST_NAME;
        final int PORT_NUMBER;

        if (args.length == 0) {
            HOST_NAME = "localhost";
            PORT_NUMBER = 1337;

        } else {
            HOST_NAME = args[0];
            PORT_NUMBER = Integer.parseInt(args[1]);
        }

        Scanner sc = new Scanner(System.in); // System.in is a standard input stream

        try (
                Socket socket = new Socket(HOST_NAME, PORT_NUMBER);
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(socket.getInputStream()));) {

            String fromServer, fromUser;

            while ((fromServer = in.readLine()) != null) {
                System.out.println("Server: " + fromServer);
                if (fromServer.equals("Client disconnected."))
                    break;

                fromUser = sc.nextLine();
                if (fromUser != null) {
                    System.out.println("Client: " + fromUser);
                    out.println(fromUser);
                }
            }
            out.close();
            in.close();
            sc.close();
            socket.close();
        }
    }

}
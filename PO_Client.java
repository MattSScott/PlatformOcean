import java.io.*;
import java.net.*;
import java.util.*;

public class PO_Client {

    private final String HOST_NAME;
    private final int PORT_NUMBER;
    final String USERNAME;
    Scanner sc = new Scanner(System.in); 

    PO_Client(String hostname, int portnumber) {
        this.HOST_NAME = hostname;
        this.PORT_NUMBER = portnumber;
        // get identity
        System.out.println("Enter username");
        this.USERNAME = sc.nextLine();
    }

    private void runClient() throws IOException{

        try (
                Socket socket = new Socket(HOST_NAME, PORT_NUMBER);
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(socket.getInputStream()));) {
            
            out.println(this.USERNAME);
            String fromServer, fromUser;

            while ((fromServer = in.readLine()) != null) {
                System.out.println("Server: " + fromServer);
                if (fromServer.equals("bye!"))
                    break;

                // fromUser = sc.nextLine(); // BLOCKS JOINING CALLS - MAKE ASYNC
                // if (fromUser != null) {
                //     System.out.println(this.USERNAME + ": " + fromUser);
                //     out.println(fromUser);
                // }
            }
            out.close();
            in.close();
            sc.close();
            socket.close();
        }
    }

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

        PO_Client client = new PO_Client(HOST_NAME, PORT_NUMBER);
        client.runClient();
    }
}
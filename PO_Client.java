import java.io.*;
import java.net.*;

public class PO_Client extends Thread {

    private final String HOST_NAME;
    private final int PORT_NUMBER;
    private final Socket socket;

    PO_Client(String hostname, int portnumber) throws IOException {
        this.HOST_NAME = hostname;
        this.PORT_NUMBER = portnumber;
        this.socket = new Socket(HOST_NAME, PORT_NUMBER);
    }

    public void run() {
        try (
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));) {

            String fromServer;
            inStreamHandler handle = new inStreamHandler(out);
            handle.start();

            while ((fromServer = in.readLine()) != null) {
                System.out.println(fromServer);
                if (!handle.isAlive()) {
                    break;
                }
            }
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private class inStreamHandler extends Thread {

        private String USERNAME;
        private PrintWriter output;

        inStreamHandler(PrintWriter p) {
            this.output = p;
        }

        public void run() {
            try (
                    BufferedReader sc = new BufferedReader(new InputStreamReader(System.in));) {

                // get identity
                System.out.println("Enter username");
                this.USERNAME = sc.readLine();
                output.println(this.USERNAME);

                String fromUser;

                while ((fromUser = sc.readLine()) != null) {
                    output.println(fromUser);
                    if (fromUser.equals("bye")) {
                        break;
                    }
                }
                sc.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
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
        client.start();
    }
}
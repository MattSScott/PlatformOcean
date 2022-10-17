public class CS_Protocol {

    enum actionSet {
        CONNECT,
        SEND_MSG,
        DISCONNECT,
    }

    private actionSet state;

    CS_Protocol() {
        this.state = actionSet.CONNECT;
        this.state = actionSet.SEND_MSG;
    }

    String parseMsg(String input) {

        if (input.equals("bye!")) {
            this.state = actionSet.DISCONNECT;
            System.out.println("Client disconnected.");
            return "Client disconnected.";
        }

        if (this.state == actionSet.SEND_MSG) {
            return input;
        }
        return "";
    }

}

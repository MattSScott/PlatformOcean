public class CS_Protocol {

    // enum actionSet {
    //     CONNECT,
    //     SEND_MSG,
    //     DISCONNECT,
    // }

    // private actionSet state;

    CS_Protocol() {
        // this.state = actionSet.CONNECT;
        // this.state = actionSet.SEND_MSG;
    }

    Message parseMsg(String input) {

        Message inputMsg = new Message(input);

        try {
            if (!inputMsg.isValid()) {
                throw new Exception("Invalid message");
            }
            return inputMsg;

        } catch (Exception e) {
            System.out.println(e);
            return new Message("");
        }
    }

}

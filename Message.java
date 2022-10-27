import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Message {
    private String inputMsg;
    private String parsedMsg;
    private String[] quantifiers;

    Message(String in) {
        this.inputMsg = in;
        this.parseInput();
    }

    private void parseInput() {
        Matcher quantFinder = Pattern.compile("!\\S+").matcher(this.inputMsg);
        if (quantFinder.find()) {
            String unparsedQuants = quantFinder.group();
            this.quantifiers = unparsedQuants.substring(1).split("!"); // avoid empty character parsed from leading "!"
            this.parsedMsg = this.inputMsg.replace(unparsedQuants, "").stripLeading().stripTrailing();
        } else {
            this.quantifiers = new String[] {};
            this.parsedMsg = this.inputMsg.stripLeading().stripTrailing();
        }
    }

    public boolean isValid() {

        if (this.parsedMsg.strip().isEmpty()) {
            return false;
        }

        for (String x : this.quantifiers) {
            if (x.length() > 2) {
                return false;
            }
        }
        return true;
    }

    public String getParsed() {
        return this.parsedMsg;
    }

    public String[] getQuantifiers() {
        return this.quantifiers;
    }

    public static void main(String[] args) {
        // String test = "!g!e!f example msg";
        String test = "example msg";

        Message m = new Message(test);
        System.out.println("MSG: " + m.inputMsg);
        System.out.println("PARSED: " + m.parsedMsg);
        System.out.print("ARGS: ");
        for (String quant : m.quantifiers) {
            System.out.print(quant + " ");
        }
        System.out.println();
        System.out.println("VALIDITY: " + m.isValid());
    }
}

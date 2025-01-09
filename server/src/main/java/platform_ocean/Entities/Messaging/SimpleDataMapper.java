package platform_ocean.Entities.Messaging;

import java.util.UUID;

public class SimpleDataMapper {

    private final UUID sender;
    private final String message;
    private final UUID messageID;
    private final MessageProtocol protocol;

    public SimpleDataMapper(UUID sender, String message, UUID messageID, MessageProtocol protocol) {
        this.sender = sender;
        this.message = message;
        this.messageID = messageID;
        this.protocol = protocol;
    }

    public UUID getSender() {
        return sender;
    }


    public String getMessage() {
        return message;
    }


    public UUID getMessageID() {
        return messageID;
    }

    public MessageProtocol getProtocol() {
        return protocol;
    }


}

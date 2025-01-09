package platform_ocean.Entities.Messaging;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.UUID;

public class DeleteRequest {

    @JsonDeserialize
    public final UUID messageID;

    public DeleteRequest() {
        this.messageID = null;
    }

    public DeleteRequest(UUID id) {
        this.messageID = id;
    }

    public UUID getMessageID() {
        return messageID;
    }

}

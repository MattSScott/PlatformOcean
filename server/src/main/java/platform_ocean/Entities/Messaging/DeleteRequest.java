package platform_ocean.Entities.Messaging;

import java.util.UUID;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

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

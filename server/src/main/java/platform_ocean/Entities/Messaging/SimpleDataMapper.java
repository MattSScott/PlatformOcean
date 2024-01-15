package platform_ocean.Entities.Messaging;

import java.util.UUID;

public class SimpleDataMapper {

	private final UUID sender;
	private final String message;
	private final UUID messageID;

	public SimpleDataMapper(UUID sender, String message, UUID messageID) {
		this.sender = sender;
		this.message = message;
		this.messageID = messageID;
	}

	public UUID getSender() {
		return sender;
	}

//	public void setSender(UUID sender) {
//		this.sender = sender;
//	}

	public String getMessage() {
		return message;
	}

//	public void setMessage(String message) {
//		this.message = message;
//	}

	public UUID getMessageID() {
		return messageID;
	}
	

}

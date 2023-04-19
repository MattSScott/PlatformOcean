package platform_ocean.Entities;

import java.util.UUID;

public class SimpleDataMapper {

	private UUID sender;
	private String message;

	public SimpleDataMapper(UUID sender, String message) {
		this.sender = sender;
		this.message = message;
	}

	public UUID getSender() {
		return sender;
	}

	public void setSender(UUID sender) {
		this.sender = sender;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}

package platform_ocean.Entities.Messaging;

import java.util.UUID;

import com.fasterxml.jackson.databind.JsonNode;

public class UpdatedPayload extends Payload {

	private JsonNode data;
	private boolean persist;
	private final UUID id;

	public UpdatedPayload(JsonNode data, boolean persist, UUID id) {
		super(data, persist);
		this.id = id;
	}

	@Override
	public JsonNode getData() {
		return data;
	}

	@Override
	public void setData(JsonNode data) {
		this.data = data;
	}

	@Override
	public boolean shouldPersist() {
		return persist;
	}

	@Override
	public void setPersist(boolean persist) {
		this.persist = persist;
	}

	public UUID getId() {
		return id;
	}

}

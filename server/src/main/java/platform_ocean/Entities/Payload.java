package platform_ocean.Entities;

import com.fasterxml.jackson.databind.JsonNode;

// Store fields from frontend payload - data, recipients, persistence, etc.
public class Payload {

	private JsonNode data;
	private boolean persist;

	public Payload() {

	}

	public Payload(JsonNode data, boolean persist) {
		this.data = data;
		this.persist = persist;
	}

	public JsonNode getData() {
		return data;
	}

	public void setData(JsonNode data) {
		this.data = data;
	}

	public boolean shouldPersist() {
		return persist;
	}

	public void setPersist(boolean shouldPersist) {
		this.persist = shouldPersist;
	}

}

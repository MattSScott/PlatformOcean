package com.sock_debug.sock.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class Test {

	@JsonProperty("payload")
	private JsonNode payload;

	public Test(JsonNode payload) {
		this.setPayload(payload);
	}

	public JsonNode getPayload() {
		return payload;
	}

	public void setPayload(JsonNode payload) {
		this.payload = payload;
	}

}

package platform_ocean.Entities.Messaging;

import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import platform_ocean.Controller.OceanMessageConverter;

@Entity
@Table(name = "DATA")
@JsonDeserialize(using = OceanMessageConverter.class)
public class DataMapper {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Transient
	private Payload payload;

	private String data;

	private UUID clientKey;

	private UUID pluginKey;

	public DataMapper() {

	}

	public DataMapper(Payload payload) throws JsonProcessingException {
		this.payload = payload;
		this.data = this.serialiseJsonData(payload.getData());
	}

	public UUID getId() {
		return id;
	}

	public UUID getClientKey() {
		return clientKey;
	}

	public void setClientKey(UUID clientKey) {
		this.clientKey = clientKey;
	}

	public UUID getPluginKey() {
		return pluginKey;
	}

	public void setPluginKey(UUID pluginKey) {
		this.pluginKey = pluginKey;
	}

	public Payload getPayload() {
		return payload;
	}

	public void setPayload(Payload payload) {
		this.payload = payload;
	}

	public String getData() {
		return data;
	}

	private String serialiseJsonData(JsonNode unserialisedData) throws JsonProcessingException {
		ObjectMapper om = new ObjectMapper();
		return om.writeValueAsString(unserialisedData);
	}

	// Defines how class data is sent to the front-end
	public SimpleDataMapper castAndSendDataToFrontend() {
		SimpleDataMapper sdmCasting = new SimpleDataMapper(this.clientKey, this.data, this.id, MessageProtocol.CREATE);
		return sdmCasting;
	}

}
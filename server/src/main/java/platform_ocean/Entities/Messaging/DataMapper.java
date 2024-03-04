package platform_ocean.Entities.Messaging;

import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "DATA")
@JsonDeserialize(using = OceanMessageConverter.class)
public class DataMapper {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	protected UUID id;

	@Transient
	private boolean persist;

	@Transient
	protected JsonNode dataNode;

	protected String data;

	private UUID clientKey;

	private UUID pluginKey;

	public DataMapper() {

	}

	public DataMapper(JsonNode dataNode, boolean persist) throws JsonProcessingException {
		this.dataNode = dataNode;
		this.persist = persist;
		try {
			this.data = dataNode.toString();
		} catch (NullPointerException e) {
			e.printStackTrace();
		}
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

	public boolean shouldPersist() {
		return this.persist;
	}

	public Object getDataNode() {
		return dataNode;
	}

	public String getData() {
		return data;
	}
	
	public void setData(String data) {
		this.data = data;
	}

//	private String serialiseJsonData(JsonNode unserialisedData) throws JsonProcessingException {
//		ObjectMapper om = new ObjectMapper();
//		return om.writeValueAsString(unserialisedData);
//	}

	// Defines how class data is sent to the front-end
	public SimpleDataMapper castToSimpleDataMapper(MessageProtocol protocol) {
		SimpleDataMapper sdmCasting = new SimpleDataMapper(this.clientKey, this.data, this.id, protocol);
		return sdmCasting;
	}

}
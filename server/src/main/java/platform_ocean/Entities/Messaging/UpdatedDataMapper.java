package platform_ocean.Entities.Messaging;

import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = UpdatedOceanMessageConverter.class)
public class UpdatedDataMapper extends DataMapper {

	public UpdatedDataMapper() {
		this.id = null;
	}

	public UpdatedDataMapper(JsonNode dataNode, boolean persist, UUID id) throws JsonProcessingException {
		super(dataNode, persist);
		this.id = id;
	}

}

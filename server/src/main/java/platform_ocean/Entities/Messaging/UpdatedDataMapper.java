package platform_ocean.Entities.Messaging;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.UUID;

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

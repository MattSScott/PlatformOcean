package platform_ocean.Entities.Messaging;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.util.UUID;

public class UpdatedOceanMessageConverter extends JsonDeserializer<UpdatedDataMapper> {

    private static final long serialVersionUID = 1L;

    @Override
    @Bean
    public UpdatedDataMapper deserialize(JsonParser parser, DeserializationContext ctxt)
            throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        TreeNode node = parser.getCodec().readTree(parser);

        TreeNode dataFromPayload = node.get("dataNode");
        TreeNode persistFromPayload = node.get("persist");
        TreeNode idFromPayload = node.get("id");

        JsonNode data = mapper.treeToValue(dataFromPayload, JsonNode.class);
        JsonNode persist = mapper.treeToValue(persistFromPayload, JsonNode.class);
        JsonNode id = mapper.treeToValue(idFromPayload, JsonNode.class);

        Boolean parsedPersist = persist.asBoolean();
        UUID parsedId = UUID.fromString(id.textValue());
        return new UpdatedDataMapper(data, parsedPersist, parsedId);
    }

    @Bean
    public SimpleModule oceanMessageDeserialiser() {
        SimpleModule module = new SimpleModule();
        module.addDeserializer(UpdatedDataMapper.class, new UpdatedOceanMessageConverter());
        return module;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}
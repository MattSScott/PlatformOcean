package platform_ocean.Entities.Messaging;

import java.io.IOException;

import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

public class OceanMessageConverter extends JsonDeserializer<DataMapper> {

	private static final long serialVersionUID = 1L;

	@Override
	@Bean
	public DataMapper deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException {

		ObjectMapper mapper = new ObjectMapper();

		TreeNode node = parser.getCodec().readTree(parser);

		TreeNode dataFromPayload = node.get("dataNode");
		TreeNode persistFromPayload = node.get("persist");

		JsonNode data = mapper.treeToValue(dataFromPayload, JsonNode.class);
		JsonNode persist = mapper.treeToValue(persistFromPayload, JsonNode.class);

		Boolean parsedPersist = persist.asBoolean();
		return new DataMapper(data, parsedPersist);
	}

	@Bean
	public SimpleModule oceanMessageDeserialiser() {
		SimpleModule module = new SimpleModule();
		module.addDeserializer(DataMapper.class, new OceanMessageConverter());
		return module;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
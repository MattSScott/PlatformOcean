package platform_ocean.Controller;

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

import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.Payload;

public class OceanMessageConverter extends JsonDeserializer<DataMapper> {

	private static final long serialVersionUID = 1L;

	@Override
	@Bean
	public DataMapper deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException, JacksonException {

		ObjectMapper mapper = new ObjectMapper();

		TreeNode node = parser.getCodec().readTree(parser);
		TreeNode payloadNode = node.get("payload");

		TreeNode dataFromPayload = payloadNode.get("data");
		TreeNode persistFromPayload = payloadNode.get("persist");

		JsonNode data = mapper.treeToValue(dataFromPayload, JsonNode.class);
		JsonNode persist = mapper.treeToValue(persistFromPayload, JsonNode.class);

		Boolean parsedPersist = persist.asBoolean();

		Payload payload = new Payload(data, parsedPersist);

		return new DataMapper(payload);
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
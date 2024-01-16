package platform_ocean.ServiceTests;

import java.util.List;
import java.util.UUID;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.fasterxml.jackson.core.JsonProcessingException;

import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.Payload;
import platform_ocean.Repository.Messaging.MessageRepository;
import platform_ocean.Service.Messaging.OceanService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MessagingTests {

	@Autowired
	private MessageRepository repo;

	@Autowired
	private OceanService serv;

	@Test
	public void ServiceCanMatchSenderAndMessageID() throws JsonProcessingException {
		UUID clientTest = UUID.randomUUID();
		UUID pluginTest = UUID.randomUUID();
		DataMapper dm = new DataMapper(new Payload(null, true));
		dm.setClientKey(clientTest);
		dm.setPluginKey(pluginTest);
		repo.save(dm);

		UUID messageTest = dm.getId();

		List<UUID> clientsFound = repo.findClientKeyById(messageTest);

		Assertions.assertThat(clientsFound.size()).isEqualTo(1);

		UUID matchingClient = clientsFound.get(0);
		Assertions.assertThat(matchingClient).isEqualTo(clientTest);
	}

	@Test
	public void ServiceCanFailMatchSenderAndMessageID() throws JsonProcessingException {
		UUID clientTest = UUID.randomUUID();
		UUID pluginTest = UUID.randomUUID();
		DataMapper dm = new DataMapper(new Payload(null, true));
		dm.setClientKey(clientTest);
		dm.setPluginKey(pluginTest);
		repo.save(dm);

		UUID messageTest = dm.getId();

		List<UUID> clientsFound = repo.findClientKeyById(messageTest);

		Assertions.assertThat(clientsFound.size()).isEqualTo(1);

		UUID matchingClient = clientsFound.get(0);
		UUID falseClient = UUID.randomUUID();
		Assertions.assertThat(matchingClient).isNotEqualTo(falseClient);
	}

	@Test
	public void ServiceCanDeleteByMessageID() throws JsonProcessingException {

		UUID clientTest = UUID.randomUUID();
		UUID pluginTest = UUID.randomUUID();
		DataMapper dm = new DataMapper(new Payload(null, true));
		dm.setClientKey(clientTest);
		dm.setPluginKey(pluginTest);
		repo.save(dm);

		UUID messageTest = dm.getId();

		List<UUID> clientsFound = repo.findClientKeyById(messageTest);

		Assertions.assertThat(clientsFound.size()).isEqualTo(1);

		serv.deleteMessage(messageTest);

		List<UUID> newClientsFound = repo.findClientKeyById(messageTest);

		Assertions.assertThat(newClientsFound.size()).isEqualTo(0);

	}

}

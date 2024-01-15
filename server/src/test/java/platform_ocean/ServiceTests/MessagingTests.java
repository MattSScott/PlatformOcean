package platform_ocean.ServiceTests;

import org.assertj.core.api.Assertions;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.context.ContextConfiguration;

import platform_ocean.Repository.Messaging.MessageRepository;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.Payload;

//@SpringBootTest(classes = MessagingTests.class)
//@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MessagingTests {

	@Autowired
	private MessageRepository repo;


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
;		
		Assertions.assertThat(matchingClient).isEqualTo(clientTest);
	}

}

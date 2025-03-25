package platform_ocean.RepositoryTests;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Repository.Messaging.MessageRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MessagingTests {

    @Autowired
    private MessageRepository repo;

    @Test
    public void RepoCanMatchSenderAndMessageID() throws JsonProcessingException {
        UUID clientTest = UUID.randomUUID();
        UUID pluginTest = UUID.randomUUID();
        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(clientTest);
        dm.setPluginKey(pluginTest);
        repo.save(dm);

        UUID messageTest = dm.getId();

        Optional<UUID> clientsFound = repo.findClientKeyById(messageTest);

        Assertions.assertThat(clientsFound.isPresent()).isTrue();

        UUID matchingClient = clientsFound.get();
        Assertions.assertThat(matchingClient).isEqualTo(clientTest);
    }

    @Test
    public void RepoCanFailMatchSenderAndMessageID() throws JsonProcessingException {
        UUID clientTest = UUID.randomUUID();
        UUID pluginTest = UUID.randomUUID();
        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(clientTest);
        dm.setPluginKey(pluginTest);
        repo.save(dm);

        UUID messageTest = dm.getId();

        Optional<UUID> clientsFound = repo.findClientKeyById(messageTest);

        Assertions.assertThat(clientsFound.isPresent()).isTrue();

        UUID matchingClient = clientsFound.get();
        UUID falseClient = UUID.randomUUID();
        Assertions.assertThat(matchingClient).isNotEqualTo(falseClient);
    }

    @Test
    public void RepoCanDeleteByMessageID() throws JsonProcessingException {

        UUID clientTest = UUID.randomUUID();
        UUID pluginTest = UUID.randomUUID();
        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(clientTest);
        dm.setPluginKey(pluginTest);
        repo.save(dm);

        UUID messageTest = dm.getId();

        Optional<UUID> clientsFound = repo.findClientKeyById(messageTest);

        Assertions.assertThat(clientsFound.isPresent()).isTrue();

        repo.deleteById(messageTest);

        Optional<UUID> newClientsFound = repo.findClientKeyById(messageTest);

        Assertions.assertThat(newClientsFound.isEmpty()).isTrue();
    }

    @Test
    public void RepoCanRetrieveMessagesById() throws JsonProcessingException {
        UUID clientKey1 = UUID.randomUUID();
        UUID clientKey2 = UUID.randomUUID();
        UUID pluginKey = UUID.randomUUID();
        DataMapper dm1 = new DataMapper(null, true);
        dm1.setClientKey(clientKey1);
        dm1.setPluginKey(pluginKey);
        repo.save(dm1);
        DataMapper dm2 = new DataMapper(null, true);
        dm2.setClientKey(clientKey2);
        dm2.setPluginKey(pluginKey);
        repo.save(dm2);

        UUID messageKey1 = dm1.getPluginKey();
        UUID messageKey2 = dm2.getPluginKey();

        Assertions.assertThat(messageKey1).isEqualTo(messageKey2);

        List<DataMapper> messagesFound = repo.findByPluginKey(messageKey1);

        Assertions.assertThat(messagesFound.size()).isEqualTo(2);
    }

    @Test
    public void RepoCanFailRetrieveMessagesById() throws JsonProcessingException {
        UUID clientKey1 = UUID.randomUUID();
        UUID clientKey2 = UUID.randomUUID();
        UUID pluginKey = UUID.randomUUID();
        DataMapper dm1 = new DataMapper(null, true);
        dm1.setClientKey(clientKey1);
        dm1.setPluginKey(pluginKey);
        repo.save(dm1);
        DataMapper dm2 = new DataMapper(null, true);
        dm2.setClientKey(clientKey2);
        dm2.setPluginKey(pluginKey);
        repo.save(dm2);

        UUID messageKey1 = dm1.getPluginKey();
        UUID messageKey2 = dm2.getPluginKey();

        Assertions.assertThat(messageKey1).isEqualTo(messageKey2);

        UUID fakeMessageKey = UUID.randomUUID();

        List<DataMapper> messagesFound = repo.findByPluginKey(fakeMessageKey);

        Assertions.assertThat(messagesFound.size()).isEqualTo(0);
    }

}

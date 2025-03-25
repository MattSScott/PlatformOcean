package platform_ocean.ServiceTests;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Service.Messaging.OceanService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MessagingTests {

    @Autowired
    private OceanService serv;

    @Test
    public void ServiceCanMatchSenderAndMessageID() throws JsonProcessingException {
        UUID clientTest = UUID.randomUUID();
        UUID pluginTest = UUID.randomUUID();
        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(clientTest);
        dm.setPluginKey(pluginTest);
        serv.createMessage(dm);

        UUID messageTest = dm.getId();

        boolean doesMatch = serv.matchRequestWithSender(clientTest, messageTest);

        Assertions.assertThat(doesMatch).isEqualTo(true);

    }

    @Test
    public void ServiceCanFailMatchSenderAndMessageID() throws JsonProcessingException {
        UUID clientTest = UUID.randomUUID();
        UUID pluginTest = UUID.randomUUID();
        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(clientTest);
        dm.setPluginKey(pluginTest);
        serv.createMessage(dm);

        UUID messageTest = dm.getId();
        UUID fakeSender = UUID.randomUUID();

        boolean doesMatch = serv.matchRequestWithSender(fakeSender, messageTest);

        Assertions.assertThat(doesMatch).isEqualTo(false);
    }

    @Test
    public void ServiceCanDeleteByMessageID() throws JsonProcessingException {

        UUID clientTest = UUID.randomUUID();
        UUID pluginTest = UUID.randomUUID();
        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(clientTest);
        dm.setPluginKey(pluginTest);
        serv.createMessage(dm);

        UUID messageTest = dm.getId();

        boolean doesMatch = serv.matchRequestWithSender(clientTest, messageTest);

        Assertions.assertThat(doesMatch).isEqualTo(true);

        serv.deleteMessage(messageTest);

        boolean retryDoesMatch = serv.matchRequestWithSender(clientTest, messageTest);

        Assertions.assertThat(retryDoesMatch).isEqualTo(false);

    }

    @Test
    public void ServiceCanLogMessage() throws JsonProcessingException {
        UUID pluginKey = UUID.randomUUID();
        UUID clientKey1 = UUID.randomUUID();
        UUID clientKey2 = UUID.randomUUID();

        DataMapper dm1 = new DataMapper(null, true);
        dm1.setClientKey(clientKey1);
        dm1.setPluginKey(pluginKey);

        serv.createMessage(dm1);

        DataMapper dm2 = new DataMapper(null, true);
        dm2.setClientKey(clientKey2);
        dm2.setPluginKey(pluginKey);

        serv.createMessage(dm2);

        List<DataMapper> messages = serv.retrieveMessagesByPlugin(pluginKey);

        Assertions.assertThat(messages.size()).isEqualTo(2);
    }

    @Test
    public void ServiceCanDeleteMultipleMessagesByID() throws JsonProcessingException {
        UUID pluginKey = UUID.randomUUID();
        UUID clientKey1 = UUID.randomUUID();
        UUID clientKey2 = UUID.randomUUID();

        DataMapper dm1 = new DataMapper(null, true);
        dm1.setClientKey(clientKey1);
        dm1.setPluginKey(pluginKey);

        serv.createMessage(dm1);

        DataMapper dm2 = new DataMapper(null, true);
        dm2.setClientKey(clientKey2);
        dm2.setPluginKey(pluginKey);

        serv.createMessage(dm2);

        List<DataMapper> messages = serv.retrieveMessagesByPlugin(pluginKey);

        Assertions.assertThat(messages.size()).isEqualTo(2);

        serv.deleteMessage(dm1.getId());

        List<DataMapper> messagesRecheck = serv.retrieveMessagesByPlugin(pluginKey);

        Assertions.assertThat(messagesRecheck.size()).isEqualTo(1);
    }

    @Test
    public void ServiceCanUpdateMessage() throws JsonProcessingException {
        UUID pluginKey = UUID.randomUUID();
        UUID author = UUID.randomUUID();

        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(author);
        dm.setPluginKey(pluginKey);
        dm.setData("OldContent");
        serv.createMessage(dm);

        Assertions.assertThat(dm.getData()).isEqualTo("OldContent");

        serv.updateMessage(dm.getId(), "NewContent");

        Optional<DataMapper> messageToFind = serv.retrieveMessagesByID(dm.getId());

        Assertions.assertThat(messageToFind.isPresent()).isTrue();

        DataMapper foundMessage = messageToFind.get();

        Assertions.assertThat(foundMessage.getData()).isEqualTo("NewContent");

    }

    @Test
    public void ServiceCanPreventUpdateMessage() throws JsonProcessingException {
        UUID pluginKey = UUID.randomUUID();
        UUID author = UUID.randomUUID();

        DataMapper dm = new DataMapper(null, true);
        dm.setClientKey(author);
        dm.setPluginKey(pluginKey);
        dm.setData("OldContent");
        serv.createMessage(dm);

        Assertions.assertThat(dm.getData()).isEqualTo("OldContent");

        serv.updateMessage(dm.getId(), "NewContent");

        Optional<DataMapper> messageToFind = serv.retrieveMessagesByID(dm.getId());

        Assertions.assertThat(messageToFind.isPresent()).isTrue();

        DataMapper foundMessage = messageToFind.get();

        Assertions.assertThat(foundMessage.getData()).isEqualTo("NewContent");
    }

}

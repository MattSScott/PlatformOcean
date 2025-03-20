package platform_ocean.Service.Messaging;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Repository.Messaging.MessageRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OceanService implements OceanServiceInterface {

    @Autowired
    private MessageRepository repo;

    @Override
    public boolean createMessage(DataMapper message) {
        try {
            repo.save(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<DataMapper> retrieveMessagesByPlugin(UUID pluginKey) {
        return repo.findByPluginKey(pluginKey);
    }

    @Override
    public Optional<DataMapper> retrieveMessagesByID(UUID pluginId) {
        return repo.findById(pluginId);
    }

    @Override
    public boolean matchRequestWithSender(UUID clientKey, UUID messageID) {
        Optional<UUID> clientResult = repo.findClientKeyById(messageID);
        if (clientResult.isEmpty()) {return false;}
        UUID foundClient = clientResult.get();

        return foundClient.equals(clientKey);
    }

    @Override
    public boolean deleteMessage(UUID messageID) {
        try {
            repo.deleteById(messageID);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateMessage(UUID messageIDToChange, String newContent) {
        try {
            Optional<DataMapper> foundMessage = repo.findById(messageIDToChange);
            if (foundMessage.isEmpty()) {return false;}
            DataMapper message = foundMessage.get();
            message.setData(newContent);
            repo.save(message);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}

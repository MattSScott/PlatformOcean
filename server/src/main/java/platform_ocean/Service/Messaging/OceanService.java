package platform_ocean.Service.Messaging;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Repository.Messaging.MessageRepository;

import java.util.List;
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
        return repo.findMessagesByPluginKey(pluginKey);
    }

    @Override
    public List<DataMapper> retrieveMessagesByID(UUID pluginId) {
        return repo.findMessageById(pluginId);
    }

    @Override
    public boolean matchRequestWithSender(UUID clientKey, UUID messageID) {

        List<UUID> matchingSenders = repo.findClientKeyById(messageID);

        if (matchingSenders.size() != 1) {
            return false;
        }

        UUID sender = matchingSenders.get(0);

        return sender.equals(clientKey);
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
            List<DataMapper> oldMessages = repo.findMessageById(messageIDToChange);
            if (oldMessages.size() != 1) {
                throw new Exception("Multiple messages found with id: " + messageIDToChange.toString());
            }
            DataMapper msg = oldMessages.get(0);
            msg.setData(newContent);
            repo.save(msg);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}

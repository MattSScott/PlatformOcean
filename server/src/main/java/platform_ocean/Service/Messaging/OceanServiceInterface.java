package platform_ocean.Service.Messaging;

import platform_ocean.Entities.Messaging.DataMapper;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OceanServiceInterface {

    List<DataMapper> retrieveMessagesByPlugin(UUID pluginkey);

    Optional<DataMapper> retrieveMessagesByID(UUID pluginId);

    boolean matchRequestWithSender(UUID clientKey, UUID messageID);

    boolean createMessage(DataMapper message);

    boolean deleteMessage(UUID messageID);

    boolean updateMessage(UUID messageID, String messageToUpdate);

}

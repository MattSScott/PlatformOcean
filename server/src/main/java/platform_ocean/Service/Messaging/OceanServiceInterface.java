package platform_ocean.Service.Messaging;

import java.util.List;
import java.util.UUID;

import platform_ocean.Entities.Messaging.DataMapper;

public interface OceanServiceInterface {

	List<DataMapper> retrieveMessagesByPlugin(UUID pluginkey);
	
	List<DataMapper> retrieveMessagesByID(UUID pluginId);

	boolean matchRequestWithSender(UUID clientKey, UUID messageID);

	boolean createMessage(DataMapper message);
	
	boolean deleteMessage(UUID messageID);
	
	boolean updateMessage(UUID messageID, String messageToUpdate);
	
}

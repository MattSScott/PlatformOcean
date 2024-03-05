package platform_ocean.Service.Messaging;

import java.util.List;
import java.util.UUID;

import platform_ocean.Entities.Messaging.DataMapper;

public interface OceanServiceInterface {

	public String logMessage(DataMapper message);

	public List<DataMapper> retrieveMessagesByPlugin(UUID pluginkey);
	
	public List<DataMapper> retrieveMessagesByID(UUID pluginId);

	public boolean matchRequestWithSender(UUID clientKey, UUID messageID);
	
	public boolean deleteMessage(UUID messageID);
	
	public boolean updateMessage(UUID messageID, String messageToUpdate);
	
}

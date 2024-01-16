package platform_ocean.Service.Messaging;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Repository.Messaging.MessageRepository;

@Service
public class OceanService implements OceanServiceInterface {

	@Autowired
	private MessageRepository repo;

	@Override
	public String logMessage(DataMapper message) {
		try {
			repo.save(message);
		} catch (Exception e) {
			return e.toString();
		}
		return "Message successfully logged";
	}

	@Override
	public List<DataMapper> retrieveMessagesByPlugin(UUID pluginKey) {
		return repo.findByPluginKey(pluginKey.toString());
	}

	@Override
	public boolean matchDeletionRequestToSender(UUID clientKey, UUID messageID) {

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
		} catch (Exception e) {
			return false;
		}
		return true;
	}

}

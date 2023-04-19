package platform_ocean.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform_ocean.Entities.DataMapper;
import platform_ocean.Repository.OceanRepository;

@Service
public class OceanService implements OceanServiceInterface {

	@Autowired
	private OceanRepository repo;

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

}

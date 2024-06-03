package platform_ocean.Service.PluginRegistry;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Repository.PluginRegistry.PluginRepository;

@Service
public class PluginService implements PluginServiceInterface {

	@Autowired
	private PluginRepository repo;

//	@Override
//	public UUID registerPlugin(PluginStore plug) {
//		String fileName = plug.getPluginName();
//		// TODO: check for duplicate plugins and increment name (NAME_x)
//		String newDir = Paths.get("").toAbsolutePath().toString();
//		String filePath = newDir + "/../plugins/" + fileName;
//		// *** start mockup filesystem ***
//		try {
//			byte[] encodedPlugin = PluginEncoder.encodePlugin(fileName);
//			PluginEncoder.decodePlugin(encodedPlugin);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		// *** end mockup filesystem ***
//		plug.setFilePath(filePath);
//		repo.save(plug);
//		return plug.getPluginKey();
//	}

	@Override
	public UUID registerPlugin(PluginStore plug) {
		repo.save(plug);
		return plug.getPluginKey();
	}


	public List<PluginStore.PluginData> retrievePlugins() {
		return repo.findAllProjectedBy();
	}
//	@Override
//	public HashMap<UUID, String> retrievePlugins() {
//		List<PluginStore> allPlugs = repo.findAll();
//		HashMap<UUID, String> keyNameMap = new HashMap<UUID, String>();
//		for (PluginStore plugin : allPlugs) {
//			keyNameMap.put(plugin.getPluginKey(), plugin.getPluginName());
//		}
//		return keyNameMap;
//	}

}

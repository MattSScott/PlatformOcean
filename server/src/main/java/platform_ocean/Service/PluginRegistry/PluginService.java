package platform_ocean.Service.PluginRegistry;

import java.nio.file.Paths;
import java.util.HashMap;
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

	@Override
	public UUID registerPlugin(PluginStore plug) {
		String pluginKeyString = plug.getPLUGIN_KEY().toString();
		String fileName = plug.getPluginName();
		// TODO: check for duplicate plugins and increment name (NAME_x)
		String newDir = Paths.get("").toAbsolutePath().toString();
		String filePath = newDir + "/src/main/plugins/" + pluginKeyString + "/" + fileName;
		plug.setFilePath(filePath);
		repo.save(plug);
		return plug.getPLUGIN_KEY();
	}

	@Override
	public HashMap<UUID, String> retrievePlugins() {
		List<PluginStore> allPlugs = repo.findAll();
		HashMap<UUID, String> keyNameMap = new HashMap<UUID, String>();
		for (PluginStore plugin : allPlugs) {
			keyNameMap.put(plugin.getPLUGIN_KEY(), plugin.getPluginName());
		}
		return keyNameMap;
	}

}

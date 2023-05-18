package platform_ocean.Service.PluginRegistry;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Repository.PluginRegistry.PluginRepository;

@Service
public class PluginService implements PluginServiceInterface {

	@Autowired
	private PluginRepository repo;

	@Override
	@ResponseStatus(code = HttpStatus.OK, reason = "OK")
	public UUID registerPlugin(PluginStore plug) {
		String pluginFileStoreLocation = Paths.get("").toAbsolutePath().toString() + "/plugins/";
		String pluginFolderName = plug.getPLUGIN_KEY().toString();
		String pluginHttpAddress = "http://localhost:8080/plugs/" + pluginFolderName + "/main.js";
		String pluginFileName = pluginFileStoreLocation + pluginFolderName + "/main.js";

//		// *** start mockup filesystem ***
//		try {
//			byte[] encodedPlugin = PluginEncoder.encodePlugin(fileName);
//			PluginEncoder.decodePlugin(encodedPlugin);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		// *** end mockup filesystem ***

		plug.setFilePath(pluginFileName);
		plug.setRetrievalAddress(pluginHttpAddress);
		repo.save(plug);
		return plug.getPLUGIN_KEY();
	}

	@Override
	public HashMap<UUID, String> retrievePlugins() {
		List<PluginStore> allPlugs = repo.findAll();
		HashMap<UUID, String> keyNameMap = new HashMap<UUID, String>();
		for (PluginStore plugin : allPlugs) {
			keyNameMap.put(plugin.getPLUGIN_KEY(), plugin.getRetrievalAddress());
		}
		return keyNameMap;
	}

}

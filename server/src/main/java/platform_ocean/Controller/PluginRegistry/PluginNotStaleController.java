package platform_ocean.Controller.PluginRegistry;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import platform_ocean.Service.PluginRegistry.PluginService;

@Controller
public class PluginNotStaleController {

	@Autowired
	PluginService service;

	@PostMapping("/pluginCheck/{ClientKey}")
	ResponseEntity<Map<UUID, String>> checkPluginsNotStale(@RequestBody HashMap<UUID, String> clientState) {

		HashMap<UUID, String> platformPlugins = service.retrievePlugins();

		Set<UUID> platformKeys = platformPlugins.keySet();
		Set<UUID> clientKeys = clientState.keySet();

		platformKeys.removeAll(clientKeys);

		HashMap<UUID, String> missingPlugins = new HashMap<UUID, String>();

		for (UUID missingKey : platformKeys) {
			missingPlugins.put(missingKey, platformPlugins.get(missingKey));
		}

		return new ResponseEntity<Map<UUID, String>>(missingPlugins, HttpStatus.OK);

	}

}

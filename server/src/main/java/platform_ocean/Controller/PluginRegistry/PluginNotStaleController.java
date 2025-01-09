package platform_ocean.Controller.PluginRegistry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Service.PluginRegistry.PluginService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
public class PluginNotStaleController {

    @Autowired
    PluginService service;

    @PostMapping("/pluginCheck/{ClientKey}")
    ResponseEntity<Map<UUID, String>> checkPluginsNotStale(@RequestBody HashMap<UUID, String> clientState) {

        List<PluginStore.PluginData> platformPlugins = service.retrievePlugins();
        HashMap<UUID, String> currentPlugs = new HashMap<>();
        for (PluginStore.PluginData record : platformPlugins) {
            currentPlugs.put(record.getPluginKey(), record.getPluginURL());
        }

        HashMap<UUID, String> missingPlugs = new HashMap<>();

        for (UUID missingKey : currentPlugs.keySet()) {
            if (!clientState.containsKey(missingKey)) {
                missingPlugs.put(missingKey, currentPlugs.get(missingKey));
            }
        }

        return new ResponseEntity<Map<UUID, String>>(missingPlugs, HttpStatus.OK);

    }

}

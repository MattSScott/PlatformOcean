package platform_ocean.Repository.PluginRegistry;

import org.springframework.beans.factory.annotation.Autowired;
import platform_ocean.Entities.PluginRegistry.PluginStore;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

public class PlatformJsonEncoder {

    @Autowired
    static PluginRepository repository;

    public static HashMap<UUID, String> generatePlatformJSON() {
        List<PluginStore> allPlugs = repository.findAll();
        HashMap<UUID, String> keyNameMap = new HashMap<UUID, String>();
        for (PluginStore plugin : allPlugs) {
            keyNameMap.put(plugin.getPluginKey(), plugin.getPluginName());
        }
        return keyNameMap;
    }
}

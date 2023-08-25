package platform_ocean.Service.PluginRegistry;

import java.util.HashMap;
import java.util.UUID;

import platform_ocean.Entities.PluginRegistry.PluginStore;

public interface PluginServiceInterface {
	UUID registerPlugin(PluginStore plug);

	HashMap<UUID, String> retrievePlugins();
}

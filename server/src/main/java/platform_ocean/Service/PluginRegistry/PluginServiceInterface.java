package platform_ocean.Service.PluginRegistry;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import platform_ocean.Entities.PluginRegistry.PluginStore;

public interface PluginServiceInterface {
	UUID registerPlugin(PluginStore plug);

	List<PluginStore.PluginData> retrievePlugins();
}

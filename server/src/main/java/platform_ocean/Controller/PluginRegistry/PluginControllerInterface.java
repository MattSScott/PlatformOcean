package platform_ocean.Controller.PluginRegistry;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import platform_ocean.Entities.PluginRegistry.PluginStore;

public interface PluginControllerInterface {
	UUID registerPlugin(PluginStore plug);

	List<PluginStore.PluginData> retrievePlugins();

}

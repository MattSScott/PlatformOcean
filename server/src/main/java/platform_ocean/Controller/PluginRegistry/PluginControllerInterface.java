package platform_ocean.Controller.PluginRegistry;

import java.util.HashMap;
import java.util.UUID;

import platform_ocean.Entities.PluginRegistry.PluginStore;

public interface PluginControllerInterface {
	UUID registerPlugin(PluginStore plug);

	HashMap<UUID, String> retrievePlugins();

}

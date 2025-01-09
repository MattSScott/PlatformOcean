package platform_ocean.Controller.PluginRegistry;

import platform_ocean.Entities.PluginRegistry.PluginStore;

import java.util.List;
import java.util.UUID;

public interface PluginControllerInterface {
    UUID registerPlugin(PluginStore plug);

    List<PluginStore.PluginData> retrievePlugins();

}

package platform_ocean.Service.PluginRegistry;

import platform_ocean.Entities.PluginRegistry.PluginStore;

import java.util.List;
import java.util.UUID;

public interface PluginServiceInterface {
    UUID registerPlugin(PluginStore plug);

    boolean removePlugin(UUID pluginKey);

    List<PluginStore.PluginData> retrievePlugins();
}

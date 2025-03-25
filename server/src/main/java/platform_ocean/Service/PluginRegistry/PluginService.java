package platform_ocean.Service.PluginRegistry;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Repository.Messaging.MessageRepository;
import platform_ocean.Repository.PluginRegistry.PluginRepository;

import java.util.List;
import java.util.UUID;

@Service
public class PluginService implements PluginServiceInterface {

    @Autowired
    private PluginRepository repo;

    @Autowired
    private MessageRepository msgRepo;


    @Override
    public UUID registerPlugin(PluginStore plug) {
        repo.save(plug);
        return plug.getPluginKey();
    }

    @Override
    @Transactional
    public boolean removePlugin(UUID pluginKey) {
        boolean pluginFound = repo.existsById(pluginKey);
        if (pluginFound) {
            repo.deleteById(pluginKey);
            msgRepo.deleteByPluginKey(pluginKey);
            return true;
        }
        return false;
    }

    public List<PluginStore.PluginData> retrievePlugins() {
        return repo.findAllProjectedBy();
    }

}

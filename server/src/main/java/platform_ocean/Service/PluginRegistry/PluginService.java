package platform_ocean.Service.PluginRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import platform_ocean.Entities.PluginRegistry.PluginStore;
import platform_ocean.Repository.PluginRegistry.PluginRepository;

@Service
public class PluginService implements PluginServiceInterface {

	@Autowired
	private PluginRepository repo;

	@Override
	public UUID registerPlugin(PluginStore plug) {
		repo.save(plug);
		return plug.getPLUGIN_KEY();
	}

	@Override
	public List<UUID> retrievePluginKeys() {
		List<PluginStore> allPlugins = repo.findAll();
		List<UUID> allKeys = new ArrayList<>();
		for (PluginStore p : allPlugins) {
			allKeys.add(p.getPLUGIN_KEY());
		}
		return allKeys;
	}

}

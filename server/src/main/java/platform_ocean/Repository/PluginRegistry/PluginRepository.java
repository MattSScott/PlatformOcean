package platform_ocean.Repository.PluginRegistry;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import platform_ocean.Entities.PluginRegistry.PluginStore;

@Repository
public interface PluginRepository extends JpaRepository<PluginStore, UUID> {

	@Override
	List<PluginStore> findAll();

}

package platform_ocean.Repository.PluginRegistry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import platform_ocean.Entities.PluginRegistry.PluginStore;

import java.util.List;
import java.util.UUID;

@Repository
public interface PluginRepository extends JpaRepository<PluginStore, UUID> {

    List<PluginStore.PluginData> findAllProjectedBy();

}

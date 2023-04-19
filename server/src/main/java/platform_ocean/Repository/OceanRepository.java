package platform_ocean.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import platform_ocean.Entities.DataMapper;

@Repository
public interface OceanRepository extends JpaRepository<DataMapper, UUID> {

	@Query(value = "SELECT * from data where plugin_key like uuid_to_bin(:key)", nativeQuery = true)
	List<DataMapper> findByPluginKey(@Param("key") String pluginKey);

//	@Query(value = "SELECT * FROM data WHERE bin_to_uuid(plugin_key) like :key", nativeQuery = true)
//	List<DataMapper> findByPluginKeyBin(@Param("key") String pluginKey);

}

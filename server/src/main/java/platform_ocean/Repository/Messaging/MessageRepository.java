package platform_ocean.Repository.Messaging;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import platform_ocean.Entities.Messaging.DataMapper;

@Repository
public interface MessageRepository extends JpaRepository<DataMapper, UUID> {

	@Query(value = "SELECT * from data where plugin_key like uuid_to_bin(:key)", nativeQuery = true)
	List<DataMapper> findByPluginKey(@Param("key") String pluginKey);
	
	
	@Query(value = "SELECT bin_to_uuid(client_key) from data where data.id like uuid_to_bin(:key)", nativeQuery = true)
	UUID findSenderFromMessageID(@Param("key") UUID messageID);

	@Query(value = "SELECT bin_to_uuid(client_key) from data where data.id = (:key)", nativeQuery = true)
	List<UUID> findClientKeyById(@Param("key") UUID messageID);
}

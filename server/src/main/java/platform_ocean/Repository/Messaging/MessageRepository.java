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

	@Query(value = "SELECT * from data where plugin_key = (:key)", nativeQuery = true)
	List<DataMapper> findMessagesByPluginKey(@Param("key") UUID pluginKey);

	@Query(value = "SELECT bin_to_uuid(client_key) from data where data.id = (:key)", nativeQuery = true)
	List<UUID> findClientKeyById(@Param("key") UUID messageID);
	
	@Query(value = "SELECT * from data where data.id = (:key)", nativeQuery = true)
	List<DataMapper> findMessageById(@Param("key") UUID messageID);
}

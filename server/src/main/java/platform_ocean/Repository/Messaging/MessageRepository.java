package platform_ocean.Repository.Messaging;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import platform_ocean.Entities.Messaging.DataMapper;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<DataMapper, UUID> {

    List<DataMapper> findByPluginKey(UUID pluginKey);

    @Query("select dm.clientKey from DataMapper dm where dm.id = ?1")
    Optional<UUID> findClientKeyById(UUID id);

}

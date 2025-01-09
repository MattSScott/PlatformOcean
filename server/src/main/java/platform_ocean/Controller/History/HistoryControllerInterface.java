package platform_ocean.Controller.History;

import org.springframework.http.ResponseEntity;
import platform_ocean.Entities.Messaging.SimpleDataMapper;

import java.util.List;
import java.util.UUID;

public interface HistoryControllerInterface {
    ResponseEntity<List<SimpleDataMapper>> retrieveDataHistory(UUID pluginKey);
}

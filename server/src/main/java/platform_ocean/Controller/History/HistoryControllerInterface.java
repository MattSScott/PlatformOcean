package platform_ocean.Controller.History;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

import platform_ocean.Entities.Messaging.SimpleDataMapper;

public interface HistoryControllerInterface {
	ResponseEntity<List<SimpleDataMapper>> retrieveDataHistory(UUID pluginKey);
}

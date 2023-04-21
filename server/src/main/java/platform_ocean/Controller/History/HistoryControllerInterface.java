package platform_ocean.Controller.History;

import java.util.List;
import java.util.UUID;

import platform_ocean.Entities.Messaging.SimpleDataMapper;

public interface HistoryControllerInterface {
	public List<SimpleDataMapper> retrieveDataHistory(UUID pluginKey);
}

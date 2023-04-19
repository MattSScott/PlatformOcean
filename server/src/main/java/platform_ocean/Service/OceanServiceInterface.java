package platform_ocean.Service;

import java.util.List;
import java.util.UUID;

import platform_ocean.Entities.DataMapper;

public interface OceanServiceInterface {

	public String logMessage(DataMapper message);

	public List<DataMapper> retrieveMessagesByPlugin(UUID pluginkey);

}

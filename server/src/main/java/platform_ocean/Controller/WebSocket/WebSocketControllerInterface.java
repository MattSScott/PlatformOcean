package platform_ocean.Controller.WebSocket;

import java.util.UUID;

import platform_ocean.Entities.DataMapper;
import platform_ocean.Entities.SimpleDataMapper;

// Implement Interface<ReturnValue, DataMapperClass>
//public interface WebSocketControllerInterface<U, T extends DataMapper<U>> {
//	@MessageMapping("/{PlugLoc}/send")
//	@SendTo("/topic/{PlugLoc}/receive")
//	public default U distributeDataToFrontend(@PathVariable("PlugLoc") String pluginLocation,
//			@Payload T dataFromFrontend) throws Exception {
//		return this.parseDataFromFrontend(dataFromFrontend);
//	}
//
//	// Override to change how data is send to front-end
//	public default U parseDataFromFrontend(@Payload T dataFromFrontend) throws Exception {
//		return dataFromFrontend.sendDataToFrontend();
//	}
//
//}

public interface WebSocketControllerInterface {

	public SimpleDataMapper distributeDataToFrontend(UUID clientKey, UUID pluginKey, DataMapper dataFromFrontend)
			throws Exception;

	// Override to change how data is send to front-end
	public SimpleDataMapper parseDataFromFrontend(DataMapper dataFromFrontend) throws Exception;

//	public List<SimpleDataMapper> retrieveDataHistory(UUID pluginKey);
}
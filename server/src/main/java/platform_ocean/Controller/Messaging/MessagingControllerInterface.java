package platform_ocean.Controller.Messaging;

import java.util.UUID;

import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.DeleteRequest;
import platform_ocean.Entities.Messaging.SimpleDataMapper;
import platform_ocean.Entities.Messaging.UpdatedDataMapper;

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

public interface MessagingControllerInterface {

	public SimpleDataMapper createMessage(UUID clientKey, UUID pluginKey, DataMapper dataFromFrontend);

	public SimpleDataMapper deleteMessage(UUID clientKey, UUID pluginKey, DeleteRequest messageID);

	public SimpleDataMapper updateMessage(UUID clientKey, UUID pluginKey, UpdatedDataMapper udm);

}
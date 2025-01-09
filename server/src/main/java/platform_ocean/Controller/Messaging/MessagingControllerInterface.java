package platform_ocean.Controller.Messaging;

import org.springframework.http.ResponseEntity;
import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.DeleteRequest;
import platform_ocean.Entities.Messaging.SimpleDataMapper;
import platform_ocean.Entities.Messaging.UpdatedDataMapper;

import java.util.UUID;

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

    ResponseEntity<SimpleDataMapper> createMessage(UUID clientKey, UUID pluginKey, DataMapper dataFromFrontend);

    ResponseEntity<SimpleDataMapper> deleteMessage(UUID clientKey, UUID pluginKey, DeleteRequest messageID);

    ResponseEntity<SimpleDataMapper> updateMessage(UUID clientKey, UUID pluginKey, UpdatedDataMapper udm);

}
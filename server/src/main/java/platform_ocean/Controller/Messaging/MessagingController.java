package platform_ocean.Controller.Messaging;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import platform_ocean.Entities.Messaging.DataMapper;
import platform_ocean.Entities.Messaging.DeleteRequest;
import platform_ocean.Entities.Messaging.MessageProtocol;
import platform_ocean.Entities.Messaging.SimpleDataMapper;
import platform_ocean.Entities.Messaging.UpdatedDataMapper;
import platform_ocean.Service.Messaging.OceanService;

//@Controller
//public class WebSocketController implements WebSocketControllerInterface<String, Message> {
//
//}

@Controller
@CrossOrigin
public class MessagingController implements MessagingControllerInterface {

	@Autowired
	private OceanService serv;

	@Override
	@MessageMapping("/{ClientKey}/{PluginKey}/send")
	@SendTo("/topic/{PluginKey}/receive")
	public ResponseEntity<SimpleDataMapper> createMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DataMapper dataFromFrontend) {

		dataFromFrontend.setClientKey(clientKey);
		dataFromFrontend.setPluginKey(pluginKey);
		if (dataFromFrontend.shouldPersist()) {
			boolean created = serv.createMessage(dataFromFrontend);
			if (!created) {
				return ResponseEntity.status(HttpStatus.INSUFFICIENT_STORAGE).build();
			}
		}

		SimpleDataMapper parsedData = dataFromFrontend.castToSimpleDataMapper(MessageProtocol.CREATE);
		return ResponseEntity.status(HttpStatus.CREATED).body(parsedData);
	}

	@Override
	@MessageMapping("{ClientKey}/{PluginKey}/delete")
	@SendTo("/topic/{PluginKey}/receive")
	public ResponseEntity<SimpleDataMapper> deleteMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DeleteRequest messageDeleteRequest) {

		final UUID messageID = messageDeleteRequest.getMessageID();
		boolean canDelete = serv.matchRequestWithSender(clientKey, messageID);

		if (!canDelete) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		boolean deleted = serv.deleteMessage(messageID);
		if (!deleted) {
			return ResponseEntity.status(HttpStatus.INSUFFICIENT_STORAGE).build();
		}

		SimpleDataMapper deleteConfirmed = new SimpleDataMapper(clientKey, null, messageID, MessageProtocol.DELETE);
		return ResponseEntity.status(HttpStatus.OK).body(deleteConfirmed);
	}

	@Override
	@MessageMapping("{ClientKey}/{PluginKey}/update")
	@SendTo("/topic/{PluginKey}/receive")
	public ResponseEntity<SimpleDataMapper> updateMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload UpdatedDataMapper messageUpdateRequest) {

		UUID idForChange = messageUpdateRequest.getId();
		boolean canUpdate = serv.matchRequestWithSender(clientKey, idForChange);

		if (!canUpdate) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String contentToChange = messageUpdateRequest.getData();
		boolean updated = serv.updateMessage(idForChange, contentToChange);
		if (!updated) {
			return ResponseEntity.status(HttpStatus.INSUFFICIENT_STORAGE).build();
		}
		SimpleDataMapper updateRequest = messageUpdateRequest.castToSimpleDataMapper(MessageProtocol.UPDATE);
		return ResponseEntity.status(HttpStatus.OK).body(updateRequest);

	}

}

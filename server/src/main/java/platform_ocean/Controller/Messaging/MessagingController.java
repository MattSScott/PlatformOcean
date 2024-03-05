package platform_ocean.Controller.Messaging;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
	public SimpleDataMapper createMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DataMapper dataFromFrontend) {

		dataFromFrontend.setClientKey(clientKey);
		dataFromFrontend.setPluginKey(pluginKey);
		if (dataFromFrontend.shouldPersist()) {
			serv.logMessage(dataFromFrontend);
		}

		return dataFromFrontend.castToSimpleDataMapper(MessageProtocol.CREATE);
	}

	@Override
	@MessageMapping("{ClientKey}/{PluginKey}/delete")
	@SendTo("/topic/{PluginKey}/receive")
	public SimpleDataMapper deleteMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DeleteRequest messageDeleteRequest) {

		final UUID messageID = messageDeleteRequest.getMessageID();
		boolean canDelete = serv.matchRequestWithSender(clientKey, messageID);

		if (canDelete) {
			serv.deleteMessage(messageID);
			return new SimpleDataMapper(clientKey, null, messageID, MessageProtocol.DELETE);
		}

		return null;

	}

	@Override
	@MessageMapping("{ClientKey}/{PluginKey}/update")
	@SendTo("/topic/{PluginKey}/receive")
	public SimpleDataMapper updateMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload UpdatedDataMapper messageUpdateRequest) {

		UUID idForChange = messageUpdateRequest.getId();
		boolean canUpdate = serv.matchRequestWithSender(clientKey, idForChange);

		if (!canUpdate) {
			return null;
		}

		try {
			String contentToChange = messageUpdateRequest.getData();
			serv.updateMessage(idForChange, contentToChange);
			return messageUpdateRequest.castToSimpleDataMapper(MessageProtocol.UPDATE);
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}

	}

}

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
import platform_ocean.Service.Messaging.OceanService;

//@Controller
//public class WebSocketController implements WebSocketControllerInterface<String, Message> {
//
//}

@Controller
@CrossOrigin
public class MessagingController implements MessagingControllerInterface {

//	private final SimpMessageSendingOperations messagingTemplate;
//
//	@Autowired
//	public WebSocketController(SimpMessageSendingOperations messagingTemplate) {
//		this.messagingTemplate = messagingTemplate;
//	}

	@Autowired
	private OceanService serv;

	@Override
	public SimpleDataMapper parseDataFromFrontend(@Payload DataMapper dataFromFrontend) throws Exception {
		return dataFromFrontend.castAndSendDataToFrontend();
	}

	@Override
	@MessageMapping("/{ClientKey}/{PluginKey}/send")
	@SendTo("/topic/{PluginKey}/receive")
	public SimpleDataMapper distributeDataToFrontend(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DataMapper dataFromFrontend) throws Exception {

		dataFromFrontend.setClientKey(clientKey);
		dataFromFrontend.setPluginKey(pluginKey);
		if (dataFromFrontend.getPayload().shouldPersist()) {
			serv.logMessage(dataFromFrontend);
		}

		return this.parseDataFromFrontend(dataFromFrontend);
	}

	@MessageMapping("{ClientKey}/{PluginKey}/delete")
	@SendTo("/topic/{PluginKey}/receive")
	public SimpleDataMapper deleteMessage(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DeleteRequest messageDeleteRequest) {
		
		final UUID messageID = messageDeleteRequest.getMessageID();
		boolean canDelete = serv.matchDeletionRequestToSender(clientKey, messageID);

		if (canDelete) {
			serv.deleteMessage(messageID);
			return new SimpleDataMapper(messageID, null, messageID, MessageProtocol.DELETE);
		}
		
		return null;

	}

}

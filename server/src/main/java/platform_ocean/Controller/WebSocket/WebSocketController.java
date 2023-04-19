package platform_ocean.Controller.WebSocket;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import platform_ocean.Entities.DataMapper;
import platform_ocean.Entities.SimpleDataMapper;
import platform_ocean.Service.OceanService;

//@Controller
//public class WebSocketController implements WebSocketControllerInterface<String, Message> {
//
//}

@Controller
//@RestController
public class WebSocketController implements WebSocketControllerInterface {

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

//	@Override
//	@GetMapping("/{PluginKey}/history")
//	public List<SimpleDataMapper> retrieveDataHistory(@PathVariable("PluginKey") UUID pluginKey) {
//		List<DataMapper> retrievedHistory = serv.retrieveMessagesByPlugin(pluginKey);
//
//		List<SimpleDataMapper> clientKeyMessagePairs = new ArrayList<>();
//
//		for (DataMapper dm : retrievedHistory) {
//			SimpleDataMapper clientKeyMessageEntry = new SimpleDataMapper(dm.getClientKey(), dm.getData());
//			clientKeyMessagePairs.add(clientKeyMessageEntry);
//		}
//
//		return clientKeyMessagePairs;
//	}

}

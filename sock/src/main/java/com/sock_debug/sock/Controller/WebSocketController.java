package com.sock_debug.sock.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.sock_debug.sock.Entities.DataMapper;
import com.sock_debug.sock.Entities.SimpleDataMapper;
import com.sock_debug.sock.Service.OceanService;

//@Controller
//public class WebSocketController implements WebSocketControllerInterface<String, Message> {
//
//}

@Controller
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
	public String parseDataFromFrontend(@Payload DataMapper dataFromFrontend) throws Exception {
		return dataFromFrontend.sendDataToFrontend();
	}

	@Override
	@MessageMapping("/{ClientKey}/{PluginKey}/send")
	@SendTo("/topic/{PluginKey}/receive")
	public String distributeDataToFrontend(@DestinationVariable("ClientKey") UUID clientKey,
			@DestinationVariable("PluginKey") UUID pluginKey, @Payload DataMapper dataFromFrontend) throws Exception {

		dataFromFrontend.setClientKey(clientKey);
		dataFromFrontend.setPluginKey(pluginKey);
		if (dataFromFrontend.getPayload().shouldPersist()) {
			serv.logMessage(dataFromFrontend);
		}

		return this.parseDataFromFrontend(dataFromFrontend);
	}

	@Override
	@MessageMapping("/{PluginKey}/history")
	@SendTo("/topic/{PluginKey}/history")
	public List<SimpleDataMapper> retrieveDataHistory(@DestinationVariable("PluginKey") UUID pluginKey) {
		List<DataMapper> retrievedHistory = serv.retrieveMessagesByPlugin(pluginKey);

		List<SimpleDataMapper> clientKeyMessagePairs = new ArrayList<>();

		for (DataMapper dm : retrievedHistory) {
			SimpleDataMapper clientKeyMessageEntry = new SimpleDataMapper(dm.getClientKey(), dm.getData());
			clientKeyMessagePairs.add(clientKeyMessageEntry);
		}

//		String historyRoutingAddress = String.format("/topic/%s/history", pluginKey);

		System.out.println("SENDING: " + clientKeyMessagePairs);

//		this.messagingTemplate.convertAndSend(historyRoutingAddress, clientKeyMessagePairs);
		return clientKeyMessagePairs;
	}

}

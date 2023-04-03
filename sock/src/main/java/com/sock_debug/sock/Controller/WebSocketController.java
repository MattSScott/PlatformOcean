package com.sock_debug.sock.Controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.sock_debug.sock.Entities.DataMapper;
import com.sock_debug.sock.Service.OceanService;

//@Controller
//public class WebSocketController implements WebSocketControllerInterface<String, Message> {
//
//}

@Controller
public class WebSocketController implements WebSocketControllerInterface {

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
			System.out.println("Was true :)");
			serv.logMessage(dataFromFrontend);
		}
		return this.parseDataFromFrontend(dataFromFrontend);
	}

	@Override
	@GetMapping("/{PluginKey}/retrieve")
	public Optional<DataMapper> retrieveDataHistory(@PathVariable("PluginKey") UUID pluginKey) {
		return serv.retrieveMessagesByPlugin(pluginKey);
	}

}

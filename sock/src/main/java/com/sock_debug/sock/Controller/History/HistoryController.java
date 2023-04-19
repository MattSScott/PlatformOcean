package com.sock_debug.sock.Controller.History;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sock_debug.sock.Entities.DataMapper;
import com.sock_debug.sock.Entities.SimpleDataMapper;
import com.sock_debug.sock.Service.OceanService;

@RestController
public class HistoryController implements HistoryControllerInterface {

	@Autowired
	private OceanService serv;

	@Override
	@GetMapping("/{PluginKey}/history")
	public List<SimpleDataMapper> retrieveDataHistory(@PathVariable("PluginKey") UUID pluginKey) {
		List<DataMapper> retrievedHistory = serv.retrieveMessagesByPlugin(pluginKey);

		List<SimpleDataMapper> clientKeyMessagePairs = new ArrayList<>();

		for (DataMapper dm : retrievedHistory) {
			SimpleDataMapper clientKeyMessageEntry = new SimpleDataMapper(dm.getClientKey(), dm.getData());
			clientKeyMessagePairs.add(clientKeyMessageEntry);
		}

		return clientKeyMessagePairs;
	}
}

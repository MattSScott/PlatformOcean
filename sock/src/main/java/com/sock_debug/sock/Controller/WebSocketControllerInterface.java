package com.sock_debug.sock.Controller;

import java.util.List;
import java.util.UUID;

import com.sock_debug.sock.Entities.DataMapper;
import com.sock_debug.sock.Entities.SimpleDataMapper;

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

	public String distributeDataToFrontend(UUID clientKey, UUID pluginKey, DataMapper dataFromFrontend)
			throws Exception;

	// Override to change how data is send to front-end
	public String parseDataFromFrontend(DataMapper dataFromFrontend) throws Exception;

	public List<SimpleDataMapper> retrieveDataHistory(UUID pluginKey);
}
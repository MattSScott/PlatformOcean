package com.sock_debug.sock.Service;

import java.util.List;
import java.util.UUID;

import com.sock_debug.sock.Entities.DataMapper;

public interface OceanServiceInterface {

	public String logMessage(DataMapper message);

	public List<DataMapper> retrieveMessagesByPlugin(UUID pluginkey);

}

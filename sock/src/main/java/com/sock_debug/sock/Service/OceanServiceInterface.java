package com.sock_debug.sock.Service;

import java.util.Optional;
import java.util.UUID;

import com.sock_debug.sock.Entities.DataMapper;

public interface OceanServiceInterface {

	public String logMessage(DataMapper message);

	public Optional<DataMapper> retrieveMessagesByPlugin(UUID pluginkey);

}

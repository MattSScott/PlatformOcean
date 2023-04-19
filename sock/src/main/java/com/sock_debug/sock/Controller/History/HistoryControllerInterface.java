package com.sock_debug.sock.Controller.History;

import java.util.List;
import java.util.UUID;

import com.sock_debug.sock.Entities.SimpleDataMapper;

public interface HistoryControllerInterface {
	public List<SimpleDataMapper> retrieveDataHistory(UUID pluginKey);
}

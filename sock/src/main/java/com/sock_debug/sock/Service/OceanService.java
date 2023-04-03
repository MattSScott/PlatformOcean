package com.sock_debug.sock.Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sock_debug.sock.Entities.DataMapper;
import com.sock_debug.sock.Repository.OceanRepository;

@Service
public class OceanService implements OceanServiceInterface {

	@Autowired
	private OceanRepository repo;

	@Override
	public String logMessage(DataMapper message) {
		try {
			repo.save(message);
		} catch (Exception e) {
			return e.toString();
		}
		return "Message successfully logged";
	}

	@Override
	public Optional<DataMapper> retrieveMessagesByPlugin(UUID pluginkey) {
		return repo.findByPluginKey(pluginkey);
	}

}

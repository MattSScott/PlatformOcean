package com.sock_debug.sock.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sock_debug.sock.Entities.DataMapper;

@Repository
public interface OceanRepository extends JpaRepository<DataMapper, UUID> {

	Optional<DataMapper> findByPluginKey(UUID pluginKey);

}

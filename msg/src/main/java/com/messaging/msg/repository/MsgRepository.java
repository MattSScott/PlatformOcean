package com.messaging.msg.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.messaging.msg.model.Message;

@Repository
public interface MsgRepository extends JpaRepository<Message, UUID> {
}

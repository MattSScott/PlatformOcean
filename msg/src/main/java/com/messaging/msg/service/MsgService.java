package com.messaging.msg.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.messaging.msg.model.Message;
import com.messaging.msg.repository.MsgRepository;

@Service
public class MsgService implements MsgServiceInterface {

    @Autowired
    MsgRepository msgRepo;

    @Override
    public boolean logMessage(Message m) {
        msgRepo.save(m);
        return true;
    }

    @Override
    public List<Message> retrieveMessages() {
        return msgRepo.findAll();
    }

}

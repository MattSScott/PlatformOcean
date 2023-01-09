package com.messaging.msg.service;

import com.messaging.msg.model.Message;
import java.util.List;

public interface MsgServiceInterface {

    public boolean logMessage(Message m);

    public List<Message> retrieveMessages();
}

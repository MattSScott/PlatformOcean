package com.messaging.msg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.messaging.msg.model.Message;
import com.messaging.msg.service.MsgService;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MsgController {

    @Autowired
    MsgService msgServ;

    @PostMapping("/send" )
    public boolean logMessage(@RequestBody Message m) {
        return msgServ.logMessage(m);
    }

    @GetMapping
    public List<Message> retrieveMessages() {
        return msgServ.retrieveMessages();
    }

}

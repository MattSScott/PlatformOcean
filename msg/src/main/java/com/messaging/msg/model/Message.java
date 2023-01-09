package com.messaging.msg.model;

import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Message {

    @Id
    private final UUID id;

    private String sender;

    private String message;

    private final Timestamp timestamp;

    Message() {
        id = UUID.randomUUID();
        timestamp = new Timestamp(System.currentTimeMillis());
    }

    public UUID getId() {
        return this.id;
    }

    public String getSender() {
        return this.sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return this.timestamp;
    }

}

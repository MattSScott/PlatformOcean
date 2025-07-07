import React, { useEffect } from "react";
import { useClientDataContext } from "../Contexts/ClientContext";
import MessageProtcol from "./MessageProtocol";
import "../Renderer/Renderer.css";
import { useMessageQueues } from "./MessageQueue";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin({ routingKey }) {
    const { client, clientID, username } = useClientDataContext();
    const { enqueueMessage, dequeueMessage, queueLength } = useMessageQueues();
    const { dataHistory, runMessageProtocol } = MessageProtcol(
      routingKey,
      enqueueMessage
    );

    useEffect(() => {
      const subscribe = () => {
        const SubscriberRoutingAddress = `/topic/${routingKey}/receive`;
        try {
          const pluginSubscription = client.subscribe(
            SubscriberRoutingAddress,
            (resp) => {
              const deserialiseJSONHeaders = JSON.parse(resp.body);
              const deserialiseJSON = deserialiseJSONHeaders.body;
              const JSONsender = deserialiseJSON.sender;
              const JSONmessage = JSON.parse(deserialiseJSON.message);
              const JSONmessageID = deserialiseJSON.messageID;
              const MessageProtcol = deserialiseJSON.protocol;
              const ParsedDatagram = {
                sender: JSONsender,
                message: JSONmessage,
                messageID: JSONmessageID,
              };
              runMessageProtocol(ParsedDatagram, MessageProtcol);
            },
            { id: `sub-${clientID}-${routingKey}` }
          );
          return pluginSubscription;
        } catch (error) {
          console.log(error);
        }
        return null;
      };

      const subscription = subscribe();

      return () => {
        subscription && subscription.unsubscribe();
      };
    }, [runMessageProtocol, client, clientID, routingKey]);

    // function getData(preprocessor = (x) => x) {
    //   return data && preprocessor(data.message);
    // }

    // function getDataHistory() {
    //   return dataHistory;
    // }

    // function getSender() {
    //   return data && data.sender;
    // }

    // function getUser() {
    //   return clientID;
    // }

    // function isMe() {
    //   if (data) {
    //     return data.sender === clientID;
    //   }
    //   return false;
    // }

    function sendCreateMessage(processedData, shouldPersist = true) {
      const SenderRoutingAddress = `/app/${clientID}/${routingKey}/send`;
      const CreateStruct = JSON.stringify({
        dataNode: processedData,
        persist: shouldPersist,
      });
      try {
        client.send(SenderRoutingAddress, {}, CreateStruct);
      } catch (error) {
        console.log(error);
      }
    }

    function sendUpdateMessage(newMessage, messageID) {
      const SenderRoutingAddress = `/app/${clientID}/${routingKey}/update`;
      const UpdateStruct = JSON.stringify({
        dataNode: newMessage,
        persist: true,
        id: messageID,
      });
      console.log(UpdateStruct, messageID);
      try {
        client.send(SenderRoutingAddress, {}, UpdateStruct);
      } catch (error) {
        console.log(error);
      }
    }

    function sendDeleteMessage(messageID) {
      const SenderRoutingAddress = `/app/${clientID}/${routingKey}/delete`;
      const DeleteStruct = JSON.stringify({ messageID: messageID });
      try {
        client.send(SenderRoutingAddress, {}, DeleteStruct);
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <WrappedComponent
        getData={dequeueMessage}
        numMessages={queueLength}
        dataHistory={dataHistory}
        // getSender={getSender}
        user={clientID}
        nickname={username}
        // isMe={isMe}
        sendCreateMessage={sendCreateMessage}
        sendUpdateMessage={sendUpdateMessage}
        sendDeleteMessage={sendDeleteMessage}
      />
    );
  }
  return WrappedPlugin;
}

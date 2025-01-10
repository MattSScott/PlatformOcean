import React, { useEffect } from "react";
import { useClientDataContext } from "../Contexts/ClientContext";
import MessageProtcol from "./MessageProtocol";
import "../Renderer/Renderer.css";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin({ routingKey }) {
    const { client, clientID } = useClientDataContext();
    const { data, dataHistory, runMessageProtocol } =
      MessageProtcol(routingKey);

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
      console.log("SUBBED!");

      return () => {
        subscription && subscription.unsubscribe();
        console.log("UNSUBBED!");
      };
    }, [runMessageProtocol, client, clientID, routingKey]);

    function getData(preprocessor = (x) => x) {
      return data && preprocessor(data.message);
    }

    function getDataHistory() {
      return dataHistory;
    }

    function getSender() {
      return data && data.sender;
    }

    function getUser() {
      return clientID;
    }

    function isMe() {
      if (data) {
        return data.sender === clientID;
      }
      return false;
    }

    function formatDataAsJSON(dataStruct, shouldPersist) {
      var payloadStruct = { dataNode: dataStruct, persist: shouldPersist };
      return JSON.stringify(payloadStruct);
    }

    function sendCreateMessage(processedData, shouldPersist = true) {
      const SenderRoutingAddress = `/app/${clientID}/${routingKey}/send`;
      try {
        client.send(
          SenderRoutingAddress,
          {},
          formatDataAsJSON(processedData, shouldPersist)
        );
      } catch (error) {
        console.log(error);
      }
    }

    function sendUpdateMessage(messageID, newMessage) {
      const SenderRoutingAddress = `/app/${clientID}/${routingKey}/update`;
      const UpdateStruct = {
        dataNode: newMessage,
        persist: true,
        id: messageID,
      };
      const UpdateJSON = JSON.stringify(UpdateStruct);
      try {
        client.send(SenderRoutingAddress, {}, UpdateJSON);
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
        getData={getData}
        getDataHistory={getDataHistory}
        getSender={getSender}
        getUser={getUser}
        isMe={isMe}
        sendCreateMessage={sendCreateMessage}
        sendUpdateMessage={sendUpdateMessage}
        sendDeleteMessage={sendDeleteMessage}
      />
    );
  }
  return WrappedPlugin;
}

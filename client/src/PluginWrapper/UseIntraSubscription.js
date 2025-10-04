import { useEffect } from "react";
import { useMessageQueues } from "./MessageQueue";
import MessageProtcol from "./MessageProtocol";
import { useClientDataContext } from "../Contexts/ClientContext";
import { usePluginRegistry } from "../Contexts/PluginRegistryContext";

export default function useIntraSubscription(routingKey) {
  const { client, clientID } = useClientDataContext();
  const { markReady } = usePluginRegistry();
  const { enqueueMessage, dequeueMessage, queueLength } = useMessageQueues();
  const { dataHistory, runMessageProtocol } = MessageProtcol(
    routingKey,
    enqueueMessage
  );

  useEffect(() => {
    if (!client) return;

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
        markReady(routingKey);
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
  }, [runMessageProtocol, markReady, client, clientID, routingKey]);

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

  return {
    watchers: {
      getData: dequeueMessage,
      numMessages: queueLength,
      dataHistory,
    },
    actions: { sendCreateMessage, sendUpdateMessage, sendDeleteMessage },
  };
}

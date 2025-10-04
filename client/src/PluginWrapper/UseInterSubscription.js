import { useEffect, useState } from "react";
import MessageProtocol from "./MessageProtocol";
import { useMessageQueues } from "./MessageQueue";
import { usePluginRegistry } from "../Contexts/PluginRegistryContext";
import { useClientDataContext } from "../Contexts/ClientContext";

export default function useInterSubscription(routingKey, depKey) {
  const { client, clientID } = useClientDataContext();
  const { enqueueMessage, dequeueMessage, queueLength } = useMessageQueues();
  const { dataHistory, runMessageProtocol } = MessageProtocol(
    depKey,
    enqueueMessage
  );
  const { pluginReadyCount, areSubsReady } = usePluginRegistry();
  const [canSubscribe, setCanSubscribe] = useState(false);

  // dependency check
  useEffect(() => {
    if (canSubscribe) return;
    const ready = areSubsReady(routingKey);
    if (ready) {
      setCanSubscribe(true);
    }

  // subscribe once deps are ready
  useEffect(() => {
    if (!canSubscribe || !client) return;

    const subscribe = () => {
      const SubscriberRoutingAddress = `/topic/${depKey}/receive`;

      try {
        const subscription = client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            const deserialiseJSONHeaders = JSON.parse(resp.body);
            const deserialiseJSON = deserialiseJSONHeaders.body;
            const ParsedDatagram = {
              sender: deserialiseJSON.sender,
              message: JSON.parse(deserialiseJSON.message),
              messageID: deserialiseJSON.messageID,
            };
            runMessageProtocol(ParsedDatagram, deserialiseJSON.protocol);
          },
          { id: `sub-${clientID}-${routingKey}-${depKey}` }
        );
        return subscription;
      } catch (err) {
        console.log(err);
      }
      return null;
    };

    const subscription = subscribe();

    return () => {
      subscription && subscription.unsubscribe();
    };
  }, [client, clientID, routingKey, depKey, runMessageProtocol, canSubscribe]);

  return {
    canSubscribe,
    watchers: {
      getData: dequeueMessage,
      numMessages: queueLength,
      dataHistory,
    },
  };
}

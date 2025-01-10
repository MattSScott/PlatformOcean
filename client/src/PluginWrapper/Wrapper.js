import React, { useCallback, useEffect } from "react";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";
import { useClientDataContext } from "../Contexts/ClientContext";
import MessageProtcol from "./MessageProtocol";
import "../Renderer/Renderer.css";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin(props) {
    const NetworkIP = useNetworkIPContext();
    const { client, clientID } = useClientDataContext();
    const { data, dataHistory, setInitialDataHistory, runMessageProtocol } =
      MessageProtcol();

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

    const subscribe = useCallback(() => {
      const SubscriberRoutingAddress = `/topic/${props.routingKey}/receive`;

      //   if (state.topicSubscription) {
      //     return;
      //   }

      try {
        const pluginSubscription = client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            const deserialiseJSONHeaders = JSON.parse(resp.body);
            const deserialiseJSON = deserialiseJSONHeaders.body;

            // console.log(
            //   deserialiseJSONHeaders.statusCode,
            //   deserialiseJSONHeaders.statusCodeValue
            // );

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
          { id: `sub-${clientID}-${props.routingKey}` }
        );
        return pluginSubscription;
      } catch (error) {
        console.log(error);
      }
      return null;
    }, [runMessageProtocol, client, clientID, props.routingKey]);

    const fetchHistory = useCallback(async () => {
      try {
        const HistoryRoutingAddress = `${NetworkIP}/history/${props.routingKey}`;
        const RawFetchedHistory = await fetch(HistoryRoutingAddress);
        const ParsedHistory = await RawFetchedHistory.json();
        const RemappedHistory = ParsedHistory.map((el) => ({
          ...el,
          message: JSON.parse(el.message),
        }));

        setInitialDataHistory(RemappedHistory);
      } catch (error) {
        console.log(error);
      }
    }, [setInitialDataHistory, NetworkIP, props.routingKey]);

    function formatDataAsJSON(dataStruct, shouldPersist) {
      var payloadStruct = { dataNode: dataStruct, persist: shouldPersist };
      return JSON.stringify(payloadStruct);
    }

    function sendCreateMessage(processedData, shouldPersist = true) {
      const SenderRoutingAddress = `/app/${clientID}/${props.routingKey}/send`;

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
      const SenderRoutingAddress = `/app/${clientID}/${props.routingKey}/update`;
      const UpdateStruct = {
        dataNode: newMessage,
        persist: true,
        id: messageID,
      };
      const UpdateJSON = JSON.stringify(UpdateStruct);

      console.log(UpdateStruct);

      try {
        client.send(SenderRoutingAddress, {}, UpdateJSON);
      } catch (error) {
        console.log(error);
      }
    }

    function sendDeleteMessage(messageID) {
      const SenderRoutingAddress = `/app/${clientID}/${props.routingKey}/delete`;
      const DeleteStruct = JSON.stringify({ messageID: messageID });
      try {
        client.send(SenderRoutingAddress, {}, DeleteStruct);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      const subscription = subscribe();
      console.log("SUBBED!");
      fetchHistory();

      return () => {
        subscription && subscription.unsubscribe();
        console.log("UNSUBBED!");
      };
    }, [subscribe, fetchHistory]);

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

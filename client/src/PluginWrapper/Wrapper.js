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

    console.log("AAAAH", client, clientID);

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
      return props.uniqueClientID;
    }

    function isMe() {
      if (data) {
        return data.sender === props.uniqueClientID;
      }
      return false;
    }

    const subscribe = useCallback(() => {
      const SubscriberRoutingAddress = `/topic/${props.routingKey}/receive`;

      //   if (state.topicSubscription) {
      //     return;
      //   }

      try {
        const pluginSubscription = props.client.subscribe(
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
          { id: `sub-${props.uniqueClientID}-${props.routingKey}` }
        );

        // setState((prevState) => ({
        //   ...prevState,
        //   topicSubscription: pluginSubscription,
        // }));

        return pluginSubscription;
      } catch (error) {
        console.log(error);
      }
      return null;
    }, [
      runMessageProtocol,
      props.client,
      props.uniqueClientID,
      props.routingKey,
    ]);

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
      const SenderRoutingAddress = `/app/${props.uniqueClientID}/${props.routingKey}/send`;

      try {
        props.client.send(
          SenderRoutingAddress,
          {},
          formatDataAsJSON(processedData, shouldPersist)
        );
      } catch (error) {
        console.log(error);
      }
    }

    function sendUpdateMessage(messageID, newMessage) {
      const SenderRoutingAddress = `/app/${props.uniqueClientID}/${props.routingKey}/update`;
      const UpdateStruct = {
        dataNode: newMessage,
        persist: true,
        id: messageID,
      };
      const UpdateJSON = JSON.stringify(UpdateStruct);

      console.log(UpdateStruct);

      try {
        props.client.send(SenderRoutingAddress, {}, UpdateJSON);
      } catch (error) {
        console.log(error);
      }
    }

    function sendDeleteMessage(messageID) {
      const SenderRoutingAddress = `/app/${props.uniqueClientID}/${props.routingKey}/delete`;
      const DeleteStruct = JSON.stringify({ messageID: messageID });
      try {
        props.client.send(SenderRoutingAddress, {}, DeleteStruct);
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

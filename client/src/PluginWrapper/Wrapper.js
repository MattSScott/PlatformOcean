import React, { useEffect, useState } from "react";
import "../Renderer/Renderer.css";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin(props) {
    const NetworkIP = useNetworkIPContext();

    const [state, setState] = useState({
      data: null,
      dataHistory: null,
    });

    useEffect(() => {
      let subscription = null;
      if (WrappedComponent) {
        // initialiseDefaultCallbacks();
        subscription = subscribe(runMessageProtocol);
        console.log("SUBBED!");
        fetchHistory();
      }

      return () => {
        subscription && subscription.unsubscribe();
        console.log("UNSUBBED!");
      };
      // eslint-disable-next-line
    }, []);

    function getData(preprocessor = (x) => x) {
      return state.data ? preprocessor(state.data.message) : null;
    }

    function getDataHistory() {
      return state.dataHistory ? state.dataHistory : [];
    }

    function runMessageProtocol(message, protocol) {
      switch (protocol) {
        case "CREATE":
          handleCreateMessage(message);
          return;
        case "UPDATE":
          handleUpdateMessage(message);
          return;
        case "DELETE":
          handleDeleteMessage(message);
          return;
        default:
          return;
      }
    }

    // function initialiseDefaultCallbacks() {
    //   const handleCreateMessage = (data) => {
    //     return data;
    //   };

    const handleCreateMessage = (data) => {
      setState((prevState) => ({
        ...prevState,
        data: data,
        dataHistory: [...prevState.dataHistory, data],
      }));
    };

    const handleUpdateMessage = (data) => {
      setState((prevState) => ({
        ...prevState,
        dataHistory: prevState.dataHistory.map((entry) => {
          if (entry.messageID !== data.messageID) {
            return entry;
          }
          return data;
        }),
      }));
    };

    const handleDeleteMessage = (data) => {
      setState((prevState) => ({
        ...prevState,
        dataHistory: prevState.dataHistory.filter(
          (entry) => entry.messageID !== data.messageID
        ),
      }));
    };

    //   updateCallbacks({
    //     handleCreateMessage: handleCreateMessage,
    //     handleUpdateMessage: handleUpdateMessage,
    //     handleDeleteMessage: handleDeleteMessage,
    //   });
    // }

    function getSender() {
      return state.data ? state.data.sender : null;
    }

    function getUser() {
      return props.uniqueClientID;
    }

    function isMe() {
      if (state.data) {
        return state.data.sender === props.uniqueClientID;
      }
      return false;
    }

    function subscribe(runMessageProtocol) {
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
    }

    async function fetchHistory() {
      try {
        const HistoryRoutingAddress = `${NetworkIP}/history/${props.routingKey}`;
        const RawFetchedHistory = await fetch(HistoryRoutingAddress);
        const ParsedHistory = await RawFetchedHistory.json();

        setState((prevState) => ({
          ...prevState,
          dataHistory: ParsedHistory.map((el) => ({
            ...el,
            message: JSON.parse(el.message),
          })),
        }));
      } catch (error) {
        console.log(error);
      }
    }

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

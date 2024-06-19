import React, { useEffect, useState, useCallback } from "react";
import "../Renderer/Renderer.css";
import FetchingPlugin from "./FetchingPlugin";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";
import { useCallbackContext } from "./CallbackSystemContext";
import { subscribe } from "./WrapperStartup";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin(props) {
    const { callbacks, updateCallbacks } = useCallbackContext();
    const NetworkIP = useNetworkIPContext();

    console.log(callbacks.handleCreateMessage);

    const [state, setState] = useState({
      data: null,
      dataHistory: null,
      topicSubscription: null,
    });

    const runMessageProtocol = useCallback(
      (message, protocol) => {
        switch (protocol) {
          case "CREATE":
            callbacks.handleCreateMessage(message);
            return;
          case "UPDATE":
            callbacks.handleUpdateMessage(message);
            return;
          case "DELETE":
            callbacks.handleDeleteMessage(message);
            return;
          default:
            return;
        }
      },
      [callbacks]
    );

    const initialiseDefaultCallbacks = useCallback(() => {
      console.log("i was called :)");

      function baseHandleCreateMessage(data) {
        console.log("Data received in wrapper:", Math.random());
        return data;
      }

      function baseHandleUpdateMessage(data) {
        setState((prevState) => ({
          ...prevState,
          dataHistory: prevState.dataHistory.map((entry) => {
            if (entry.messageID !== data.messageID) {
              return entry;
            }
            return data;
          }),
        }));
      }

      function baseHandleDeleteMessage(data) {
        setState((prevState) => ({
          ...prevState,
          dataHistory: prevState.dataHistory.filter(
            (entry) => entry.messageID !== data.messageID
          ),
        }));
      }

      updateCallbacks({
        handleCreateMessage: baseHandleCreateMessage,
        handleUpdateMessage: baseHandleUpdateMessage,
        handleDeleteMessage: baseHandleDeleteMessage,
      });

      console.log(callbacks.handleCreateMessage);
    }, [updateCallbacks]);

    const fetchHistory = useCallback(async () => {
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
    }, [NetworkIP, props.routingKey]);

    // when component mounts
    useEffect(() => {
      let subscription = null;

      const messageHandler = (MessageProtcol, ParsedDatagram) => {
        setState(
          (prevState) =>
            MessageProtcol === "CREATE" && {
              ...prevState,
              data: ParsedDatagram,
              dataHistory: [...prevState.dataHistory, ParsedDatagram],
            }
        );
        runMessageProtocol(ParsedDatagram, MessageProtcol);
      };

      if (WrappedComponent) {
        initialiseDefaultCallbacks();
        console.log(callbacks.handleCreateMessage);
        subscription = subscribe(messageHandler, props);
        console.log("SUBBED!");
        fetchHistory();
      }

      return () => {
        subscription && subscription.unsubscribe();
        console.log("UNSUBBED!");
      };
    }, [props, initialiseDefaultCallbacks, fetchHistory, runMessageProtocol]);

    function getData(preprocessor = (x) => x) {
      return state.data ? preprocessor(state.data.message) : null;
    }

    function getDataHistory() {
      return state.dataHistory ? state.dataHistory : [];
    }

    // function runMessageProtocol(message, protocol) {
    //   switch (protocol) {
    //     case "CREATE":
    //       callbacks.handleCreateMessage(message);
    //       return;
    //     case "UPDATE":
    //       callbacks.handleUpdateMessage(message);
    //       return;
    //     case "DELETE":
    //       callbacks.handleDeleteMessage(message);
    //       return;
    //     default:
    //       return;
    //   }
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

    // async function fetchHistory() {
    //   if (state.dataHistory) {
    //     return;
    //   }

    //   try {
    //     const HistoryRoutingAddress = `${NetworkIP}/history/${props.routingKey}`;
    //     const RawFetchedHistory = await fetch(HistoryRoutingAddress);
    //     const ParsedHistory = await RawFetchedHistory.json();

    //     setState((prevState) => ({
    //       ...prevState,
    //       dataHistory: ParsedHistory.map((el) => ({
    //         ...el,
    //         message: JSON.parse(el.message),
    //       })),
    //     }));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

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
      <React.Suspense fallback={<FetchingPlugin />}>
        {WrappedComponent && (
          <WrappedComponent
            getData={getData}
            getDataHistory={getDataHistory}
            getSender={getSender}
            getUser={getUser}
            isMe={isMe}
            sendCreateMessage={sendCreateMessage}
            sendUpdateMessage={sendUpdateMessage}
            sendDeleteMessage={sendDeleteMessage}
            updateCallbacks={updateCallbacks}
          />
        )}
      </React.Suspense>
    );
  }
  return WrappedPlugin;
}

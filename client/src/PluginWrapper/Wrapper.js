import React, { useEffect, useState } from "react";
import "../Renderer/Renderer.css";
import FetchingPlugin from "./FetchingPlugin";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";
import { useCallbackContext } from "./CallbackSystemContext";

// export default function PluginWrapper(WrappedComponent) {
//   const { callbacks, updateCallbacks } = useCallbackContext();
//   const NetworkIP = useNetworkIPContext();

//   console.log(callbacks);

//   return class extends React.Component {
//     constructor() {
//       super();
//       this.handleCreateMessage = this.handleCreateMessage.bind(this);
//       this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
//       this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
//     }

//     state = {
//       data: null,
//       dataHistory: null,
//       topicSubscription: null,
//     };

//     // static contextType = NetworkIPContext;

//     componentDidMount() {
//       WrappedComponent && this.fetchHistory();
//       WrappedComponent && this.subscribe();
//       //   WrappedComponent && this.initialiseDefaultCallbacks();
//     }

//     componentWillUnmount() {
//       if (this.state.topicSubscription) {
//         this.state.topicSubscription.unsubscribe();
//       }
//     }

//     getData(preprocessor = (x) => x) {
//       return this.state.data ? preprocessor(this.state.data.message) : null;
//     }

//     getDataHistory() {
//       return this.state.dataHistory ? this.state.dataHistory : [];
//     }

//     // runMessageProtocol(message, protocol) {
//     //   switch (protocol) {
//     //     case "CREATE":
//     //       this.handleCreateMessage(message);
//     //       return;
//     //     case "UPDATE":
//     //       this.handleUpdateMessage(message);
//     //       return;
//     //     case "DELETE":
//     //       this.handleDeleteMessage(message);
//     //       return;
//     //     default:
//     //       return;
//     //   }
//     // }

//     runMessageProtocol(message, protocol) {
//       switch (protocol) {
//         case "CREATE":
//           callbacks.handleCreateMessage(message);
//           return;
//         case "UPDATE":
//           callbacks.handleUpdateMessage(message);
//           return;
//         case "DELETE":
//           callbacks.handleDeleteMessage(message);
//           return;
//         default:
//           return;
//       }
//     }

//     initialiseDefaultCallbacks() {
//       updateCallbacks({
//         handleCreateMessage: this.handleCreateMessage,
//         handleUpdateMessage: this.handleUpdateMessage,
//         handleDeleteMessage: this.handleDeleteMessage,
//       });
//     }

//     handleCreateMessage(data) {
//       return data;
//     }

//     handleUpdateMessage(data) {
//       this.setState((prevState) => ({
//         ...prevState,
//         dataHistory: prevState.dataHistory.map((entry) => {
//           if (entry.messageID !== data.messageID) {
//             return entry;
//           }
//           return data;
//         }),
//       }));
//     }

//     handleDeleteMessage(data) {
//       this.setState((prevState) => ({
//         ...prevState,
//         dataHistory: prevState.dataHistory.filter(
//           (entry) => entry.messageID !== data.messageID
//         ),
//       }));
//     }

//     getSender() {
//       return this.state.data ? this.state.data.sender : null;
//     }

//     getUser() {
//       return this.props.uniqueClientID;
//     }

//     isMe() {
//       if (this.state.data) {
//         return this.state.data.sender === this.props.uniqueClientID;
//       }
//       return false;
//     }

//     subscribe() {
//       const SubscriberRoutingAddress = `/topic/${this.props.routingKey}/receive`;

//       if (this.state.topicSubscription) {
//         return;
//       }

//       try {
//         const pluginSubscription = this.props.client.subscribe(
//           SubscriberRoutingAddress,
//           (resp) => {
//             const deserialiseJSONHeaders = JSON.parse(resp.body);
//             const deserialiseJSON = deserialiseJSONHeaders.body;

//             console.log(
//               deserialiseJSONHeaders.statusCode,
//               deserialiseJSONHeaders.statusCodeValue
//             );

//             const JSONsender = deserialiseJSON.sender;
//             const JSONmessage = JSON.parse(deserialiseJSON.message);
//             const JSONmessageID = deserialiseJSON.messageID;
//             const MessageProtcol = deserialiseJSON.protocol;
//             const ParsedDatagram = {
//               sender: JSONsender,
//               message: JSONmessage,
//               messageID: JSONmessageID,
//             };

//             this.setState(
//               (prevState) =>
//                 MessageProtcol === "CREATE" && {
//                   ...prevState,
//                   data: ParsedDatagram,
//                   dataHistory: [...this.state.dataHistory, ParsedDatagram],
//                 },
//               () => {
//                 this.runMessageProtocol(ParsedDatagram, MessageProtcol);
//               }
//             );
//           },
//           { id: `sub-${this.props.uniqueClientID}-${this.props.routingKey}` }
//         );

//         this.setState((prevState) => ({
//           ...prevState,
//           topicSubscription: pluginSubscription,
//         }));
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     async fetchHistory() {
//       if (this.state.dataHistory) {
//         return;
//       }

//       try {
//         const HistoryRoutingAddress = `${NetworkIP}/history/${this.props.routingKey}`;
//         const RawFetchedHistory = await fetch(HistoryRoutingAddress);
//         const ParsedHistory = await RawFetchedHistory.json();

//         this.setState((prevState) => ({
//           ...prevState,
//           dataHistory: ParsedHistory.map((el) => ({
//             ...el,
//             message: JSON.parse(el.message),
//           })),
//         }));
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     formatDataAsJSON(dataStruct, shouldPersist) {
//       var payloadStruct = { dataNode: dataStruct, persist: shouldPersist };
//       return JSON.stringify(payloadStruct);
//     }

//     sendCreateMessage(processedData, shouldPersist = true) {
//       const SenderRoutingAddress = `/app/${this.props.uniqueClientID}/${this.props.routingKey}/send`;

//       try {
//         this.props.client.send(
//           SenderRoutingAddress,
//           {},
//           this.formatDataAsJSON(processedData, shouldPersist)
//         );
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     sendUpdateMessage(messageID, newMessage) {
//       const SenderRoutingAddress = `/app/${this.props.uniqueClientID}/${this.props.routingKey}/update`;
//       const UpdateStruct = {
//         dataNode: newMessage,
//         persist: true,
//         id: messageID,
//       };
//       const UpdateJSON = JSON.stringify(UpdateStruct);

//       console.log(UpdateStruct);

//       try {
//         this.props.client.send(SenderRoutingAddress, {}, UpdateJSON);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     sendDeleteMessage(messageID) {
//       const SenderRoutingAddress = `/app/${this.props.uniqueClientID}/${this.props.routingKey}/delete`;
//       const DeleteStruct = JSON.stringify({ messageID: messageID });
//       try {
//         this.props.client.send(SenderRoutingAddress, {}, DeleteStruct);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     render() {
//       return (
//         <React.Suspense fallback={<FetchingPlugin />}>
//           {WrappedComponent && (
//             <WrappedComponent
//               {...this.props}
//               getData={this.getData}
//               getDataHistory={this.getDataHistory}
//               getSender={this.getSender}
//               getUser={this.getUser}
//               sendCreateMessage={this.sendCreateMessage}
//               sendUpdateMessage={this.sendUpdateMessage}
//               sendDeleteMessage={this.sendDeleteMessage}
//               updateCallbacks={updateCallbacks}
//             />
//           )}
//         </React.Suspense>
//       );
//     }
//   };
// }

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin(props) {
    const { callbacks, updateCallbacks } = useCallbackContext();
    const NetworkIP = useNetworkIPContext();

    const [state, setState] = useState({
      data: null,
      dataHistory: null,
      topicSubscription: null,
    });

    console.log(state);

    useEffect(() => {
      if (!WrappedComponent) {
        return;
      }
      const subscription = subscribe();
      fetchHistory();
      initialiseDefaultCallbacks();

      return () => {
        subscription.unsubscribe();
      };
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
    }

    function initialiseDefaultCallbacks() {
      updateCallbacks({
        handleCreateMessage: handleCreateMessage,
        handleUpdateMessage: handleUpdateMessage,
        handleDeleteMessage: handleDeleteMessage,
      });
    }

    function handleCreateMessage(data) {
      return data;
    }

    function handleUpdateMessage(data) {
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

    function handleDeleteMessage(data) {
      setState((prevState) => ({
        ...prevState,
        dataHistory: prevState.dataHistory.filter(
          (entry) => entry.messageID !== data.messageID
        ),
      }));
    }

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

    function subscribe() {
      const SubscriberRoutingAddress = `/topic/${props.routingKey}/receive`;

      if (state.topicSubscription) {
        return;
      }

      try {
        const pluginSubscription = props.client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            const deserialiseJSONHeaders = JSON.parse(resp.body);
            const deserialiseJSON = deserialiseJSONHeaders.body;

            console.log(
              deserialiseJSONHeaders.statusCode,
              deserialiseJSONHeaders.statusCodeValue
            );

            const JSONsender = deserialiseJSON.sender;
            const JSONmessage = JSON.parse(deserialiseJSON.message);
            const JSONmessageID = deserialiseJSON.messageID;
            const MessageProtcol = deserialiseJSON.protocol;
            const ParsedDatagram = {
              sender: JSONsender,
              message: JSONmessage,
              messageID: JSONmessageID,
            };

            setState(
              (prevState) =>
                MessageProtcol === "CREATE" && {
                  ...prevState,
                  data: ParsedDatagram,
                  dataHistory: [...state.dataHistory, ParsedDatagram],
                },
              () => {
                runMessageProtocol(ParsedDatagram, MessageProtcol);
              }
            );
          },
          { id: `sub-${props.uniqueClientID}-${props.routingKey}` }
        );

        setState((prevState) => ({
          ...prevState,
          topicSubscription: pluginSubscription,
        }));
        return pluginSubscription;
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchHistory() {
      if (state.dataHistory) {
        return;
      }

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
      <React.Suspense fallback={<FetchingPlugin />}>
        {WrappedComponent && (
          <WrappedComponent
            {...props}
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

import React from "react";
import "../Renderer/Renderer.css";
import FetchingPlugin from "./FetchingPlugin";
import { NetworkIPContext } from "../Contexts/ServerIPContext";

export default function PluginWrapper(WrappedComponent) {
  return class extends React.Component {
    state = {
      data: null,
      dataHistory: null,
      topicSubscription: null,
    };

    static contextType = NetworkIPContext;

    componentDidMount() {
      this.fetchHistory();
      this.subscribe();
    }

    componentWillUnmount() {
      if (this.state.topicSubscription) {
        this.state.topicSubscription.unsubscribe();
      }
    }

    getData(preprocessor = (x) => x) {
      return this.state.data ? preprocessor(this.state.data.message) : null;
    }

    getDataHistory() {
      return this.state.dataHistory ? this.state.dataHistory : [];
    }

    runMessageProtocol(message, protocol) {
      switch (protocol) {
        case "CREATE":
          this.handleCreateMessage(message);
          return;
        case "UPDATE":
          this.handleUpdateMessage(message);
          return;
        case "DELETE":
          this.handleDeleteMessage(message);
          return;
        default:
          return;
      }
    }

    handleCreateMessage(data) {
      return data;
    }

    handleUpdateMessage(data) {
      this.setState((prevState) => ({
        ...prevState,
        dataHistory: prevState.dataHistory.map((entry) => {
          if (entry.messageID !== data.messageID) {
            return entry;
          }
          return data;
        }),
      }));
    }

    handleDeleteMessage(data) {
      this.setState((prevState) => ({
        ...prevState,
        dataHistory: prevState.dataHistory.filter(
          (entry) => entry.messageID !== data.messageID
        ),
      }));
    }

    getSender() {
      return this.state.data ? this.state.data.sender : null;
    }

    getUser() {
      return this.props.uniqueClientID;
    }

    isMe() {
      if (this.state.data) {
        return this.state.data.sender === this.props.uniqueClientID;
      }
      return false;
    }

    subscribe() {
      const SubscriberRoutingAddress = `/topic/${this.props.routingKey}/receive`;

      if (this.state.topicSubscription) {
        return;
      }

      try {
        const pluginSubscription = this.props.client.subscribe(
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

            this.setState(
              (prevState) =>
                MessageProtcol === "CREATE" && {
                  ...prevState,
                  data: ParsedDatagram,
                  dataHistory: [...this.state.dataHistory, ParsedDatagram],
                },
              () => {
                this.runMessageProtocol(ParsedDatagram, MessageProtcol);
              }
            );
          },
          { id: `sub-${this.props.uniqueClientID}-${this.props.routingKey}` }
        );

        this.setState((prevState) => ({
          ...prevState,
          topicSubscription: pluginSubscription,
        }));
      } catch (error) {
        console.log(error);
      }
    }

    async fetchHistory() {
      if (this.state.dataHistory) {
        return;
      }

      try {
        const HistoryRoutingAddress = `${this.context}/history/${this.props.routingKey}`;
        const RawFetchedHistory = await fetch(HistoryRoutingAddress);
        const ParsedHistory = await RawFetchedHistory.json();

        this.setState((prevState) => ({
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

    formatDataAsJSON(dataStruct, shouldPersist) {
      var payloadStruct = { dataNode: dataStruct, persist: shouldPersist };
      return JSON.stringify(payloadStruct);
    }

    sendCreateMessage(processedData, shouldPersist = true) {
      const SenderRoutingAddress = `/app/${this.props.uniqueClientID}/${this.props.routingKey}/send`;

      try {
        this.props.client.send(
          SenderRoutingAddress,
          {},
          this.formatDataAsJSON(processedData, shouldPersist)
        );
      } catch (error) {
        console.log(error);
      }
    }

    sendUpdateMessage(messageID, newMessage) {
      const SenderRoutingAddress = `/app/${this.props.uniqueClientID}/${this.props.routingKey}/update`;
      const UpdateStruct = {
        dataNode: newMessage,
        persist: true,
        id: messageID,
      };
      const UpdateJSON = JSON.stringify(UpdateStruct);

      console.log(UpdateStruct);

      try {
        this.props.client.send(SenderRoutingAddress, {}, UpdateJSON);
      } catch (error) {
        console.log(error);
      }
    }

    sendDeleteMessage(messageID) {
      const SenderRoutingAddress = `/app/${this.props.uniqueClientID}/${this.props.routingKey}/delete`;
      const DeleteStruct = JSON.stringify({ messageID: messageID });
      try {
        this.props.client.send(SenderRoutingAddress, {}, DeleteStruct);
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return (
        <React.Suspense fallback={<FetchingPlugin />}>
          {WrappedComponent && (
            <WrappedComponent
              {...this.props}
              getData={this.getData}
              getDataHistory={this.getDataHistory}
              getSender={this.getSender}
              getUser={this.getUser}
              sendCreateMessage={this.sendCreateMessage}
              sendUpdateMessage={this.sendUpdateMessage}
              sendDeleteMessage={this.sendDeleteMessage}
            />
          )}
        </React.Suspense>
      );
    }
  };
}

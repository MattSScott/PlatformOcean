import React from "react";
import "../Renderer/Renderer.css";
import NullView from "../NullView/NullView";
import { NetworkIPContext } from "../Contexts/ServerIPContext";

class PluginWrapper extends React.Component {
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
    return this.state.dataHistory;
  }

  handleMessageReceived(data) {
    return data;
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
          const deserialiseJSON = JSON.parse(resp.body);

          const JSONsender = deserialiseJSON.sender;
          const JSONmessage = JSON.parse(deserialiseJSON.message);
          const JSONmessageID = deserialiseJSON.messageID;
          const convertedData = {
            sender: JSONsender,
            message: JSONmessage,
            messageID: JSONmessageID,
          };

          this.setState(
            (prevState) => ({
              ...prevState,
              data: convertedData,
              dataHistory: [...this.state.dataHistory, convertedData],
            }),
            () => {
              this.handleMessageReceived(convertedData);
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

      console.log(ParsedHistory);

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
    var payloadStruct = {
      payload: { data: dataStruct, persist: shouldPersist },
    };
    return JSON.stringify(payloadStruct);
  }

  sendDataToBackend(processedData, shouldPersist = true) {
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

  render() {
    return (
      <div className="componentHouse">
        <NullView />
      </div>
    );
  }
}

export default PluginWrapper;

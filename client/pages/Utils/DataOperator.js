import React from "react";

export default function DataOperator(ChildComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.sendDataToBackend = this.sendDataToBackend.bind(this);
    }

    state = {
      client: this.props.client,
      pluginKey: this.props.routingKey,
      uniqueClientID: this.props.uniqueClientID,
      data: null,
      dataHistory: null,
      topicSubscription: null,
    };

    componentDidMount() {
      this.fetchHistory();
      this.subscribe();
    }

    componentWillUnmount() {
      if (this.state.topicSubscription) {
        this.state.topicSubscription.unsubscribe();
      }
    }

    subscribe() {
      const SubscriberRoutingAddress = `/topic/${this.state.pluginKey}/receive`;

      if (this.state.topicSubscription) {
        return;
      }

      try {
        const pluginSubscription = this.state.client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            const deserialiseJSON = JSON.parse(resp.body);
            const JSONsender = deserialiseJSON.sender;
            const JSONmessage = JSON.parse(deserialiseJSON.message);
            const convertedData = { sender: JSONsender, message: JSONmessage };

            this.setState((prevState) => ({
              ...prevState,
              data: convertedData,
              dataHistory: [...this.state.dataHistory, convertedData],
            }));
          },
          { id: `sub-${this.state.uniqueClientID}-${this.state.pluginKey}` }
        );

        this.setState((prevState) => ({
          ...prevState,
          topicSubscription: pluginSubscription,
        }));
      } catch (error) {
        console.log(error);
      }
    }

    async requestPluginKey() {
      if (this.state.pluginKey) {
        return;
      }

      try {
        const KeyRoutingAddress = `http://localhost:8080/plugins/get`;

        const RawFetchedHistory = await fetch(KeyRoutingAddress);

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

    async fetchHistory() {
      if (this.state.dataHistory) {
        return;
      }

      try {
        const HistoryRoutingAddress = `http://localhost:8080/history/${this.state.pluginKey}`;

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
        setTimeout(() => {
          this.fetchHistory();
        }, 1000);
      }
    }

    formatDataAsJSON(dataStruct, shouldPersist) {
      var payloadStruct = {
        payload: { data: dataStruct, persist: shouldPersist },
      };
      return JSON.stringify(payloadStruct);
    }

    sendDataToBackend(processedData, shouldPersist = true) {
      const SenderRoutingAddress = `/app/${this.state.uniqueClientID}/${this.state.pluginKey}/send`;

      try {
        this.state.client.send(
          SenderRoutingAddress,
          {},
          this.formatDataAsJSON(processedData, shouldPersist)
        );
      } catch (error) {
        console.log(error);
      }
    }

    render() {
      return this.state.dataHistory ? (
        <ChildComponent
          data={this.state.data}
          allData={this.state.dataHistory}
          sender={this.sendDataToBackend}
          clientID={this.state.uniqueClientID}
        />
      ) : (
        <p>Loading Component...</p>
      );
    }
  };
}

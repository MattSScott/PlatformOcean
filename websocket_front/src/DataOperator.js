import React from "react";

export default function DataOperator(ChildComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.sendDataToBackend = this.sendDataToBackend.bind(this);
    }

    state = {
      client: this.props.client,
      routingKey: this.props.routingKey,
      uniqueClientID: this.props.uniqueClientID,
      data: null,
      dataHistory: null,
      topicSubscription: null,
      historySubscription: null,
    };

    componentDidMount() {
      this.subscribeHistoric();
      this.subscribe();
    }

    componentWillUnmount() {
      if (this.state.topicSubscription) {
        this.state.topicSubscription.unsubscribe();
      }
    }

    componentDidUpdate() {
      if (this.state.dataHistory && this.state.historySubscription) {
        this.state.historySubscription.unsubscribe();
        this.state.historySubscription = null;
      }
    }

    subscribe() {
      const SubscriberRoutingAddress = `/topic/${this.state.routingKey}/receive`;

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
          { id: `sub-${this.state.uniqueClientID}-${this.state.routingKey}` }
        );

        this.setState((prevState) => ({
          ...prevState,
          topicSubscription: pluginSubscription,
        }));
      } catch (error) {
        console.log(error);
      }
    }

    subscribeHistoric() {
      const SubscriberRoutingAddress = `/topic/${this.state.routingKey}/history`;
      const pollHistoryAddress = `/app/${this.state.routingKey}/history`;

      if (this.state.dataHistory) {
        return;
      }

      try {
        const historySubscription = this.state.client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            this.setState((prevState) => ({
              ...prevState,
              dataHistory: JSON.parse(resp.body).map((el) => ({
                ...el,
                message: JSON.parse(el.message),
              })),
              historySubscription: historySubscription,
            }));
          },
          {
            id: `sub-${this.state.uniqueClientID}-${this.state.routingKey}-history`,
          }
        );
        this.state.client.send(pollHistoryAddress);
      } catch (error) {
        console.log(error);
      }
    }

    // formatDataForHistory(dataStruct) {
    //   return
    // }

    formatDataAsJSON(dataStruct, shouldPersist) {
      var payloadStruct = {
        payload: { data: dataStruct, persist: shouldPersist },
      };
      return JSON.stringify(payloadStruct);
    }

    sendDataToBackend(processedData, shouldPersist = true) {
      const SenderRoutingAddress = `/app/${this.state.uniqueClientID}/${this.state.routingKey}/send`;

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

    retrieveHistoricalData() {}

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

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
      dataHistory: [],
    };

    componentDidMount() {
      this.subscribe();
      this.subscribeHistoric();
    }

    subscribe() {
      const SubscriberRoutingAddress = `/topic/${this.state.routingKey}/receive`;

      try {
        this.state.client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            this.setState((prevState) => ({
              ...prevState,
              data: JSON.parse(resp.body),
            }));
          },
          { id: `sub-${this.state.uniqueClientID}-${this.state.routingKey}` }
        );
      } catch (error) {
        console.log(error);
      }
    }

    subscribeHistoric() {
      const SubscriberRoutingAddress = `/topic/${this.state.routingKey}/history`;

      try {
        this.state.client.subscribe(
          SubscriberRoutingAddress,
          (resp) => {
            this.setState((prevState) => ({
              ...prevState,
              dataHistory: JSON.parse(resp.body),
            }));
          },
          // { id: `sub-${this.state.uniqueClientID}-${this.state.routingKey}` }
          {}
        );
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
      return (
        <ChildComponent
          data={this.state.data}
          sender={this.sendDataToBackend}
          clientID={this.state.uniqueClientID}
        />
      );
    }
  };
}

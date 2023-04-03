import React from "react";

export default class SenderSubscriber extends React.Component {
  constructor(props) {
    super(props);
    this.sendDataToBackend = this.sendDataToBackend.bind(this);
  }

  state = {
    client: this.props.client,
    routingKey: this.props.routingKey,
    uniqueClientID: this.props.uniqueClientID,
    data: null,
  };

  componentDidMount() {
    this.subscribe();
  }
  // VV use for multiple clients
  //   subscribe() {
  //     this.state.client.connect({}, (frame) => {
  //       console.log("Connected: " + frame);
  //       this.state.client.subscribe(
  //         `/topic/${this.state.routingKey}/receive`,
  //         (resp) => {
  //           this.setState((prevState) => ({ ...prevState, data: resp.body }));
  //         }
  //       );
  //     });
  //   }

  subscribe() {
    try {
      this.state.client.subscribe(
        `/topic/${this.state.routingKey}/receive`,
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

  formatDataAsJSON(dataStruct) {
    var payloadStruct = { payload: dataStruct };
    return JSON.stringify(payloadStruct);
  }

  sendDataToBackend(processedData) {
    try {
      this.state.client.send(
        `/app/${this.state.routingKey}/send`,
        {},
        this.formatDataAsJSON(processedData)
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        data: this.state.data,
        sender: this.sendDataToBackend,
      })
    );
  }
}

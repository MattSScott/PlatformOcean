import Registration from "../Registration/Registration";
import React from "react";
import Renderer from "../Renderer/Renderer";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";

class Gateway extends React.Component {
  constructor(props) {
    super(props);
    this.clientConnector = this.clientConnector.bind(this);
    this.successfulConnectionCallback =
      this.successfulConnectionCallback.bind(this);
    this.noConnectionCallback = this.noConnectionCallback.bind(this);
    this.bindClient = this.bindClient.bind(this);
  }

  state = {
    client: null,
    clientID: null,
  };

  clientConnector() {
    const socket = new SockJS("http://localhost:8080/PlatformOcean"); // handshake with endpoint
    const clientHelper = Stomp.over(socket);
    clientHelper.connect(
      {},
      () => this.successfulConnectionCallback(clientHelper),
      this.noConnectionCallback
    );
  }

  noConnectionCallback(error) {
    console.log("STOMP: " + error);
    setTimeout(this.clientConnector, 5000);
    console.log("STOMP: Reconecting in 5 seconds");
  }

  successfulConnectionCallback(clientHelper) {
    this.setState((prevState) => ({
      ...prevState,
      client: clientHelper,
    }));
  }

  componentDidMount() {
    this.clientConnector();
  }

  componentWillUnmount() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  bindClient(clientInstance) {
    this.setState((prevState) => ({
      ...prevState,
      clientID: clientInstance,
    }));
    localStorage.setItem("userID", clientInstance);
  }

  render() {
    const RoutingMechanism = this.state.clientID ? (
      <Renderer
        clientID={this.state.clientID}
        client={this.state.client}
        setClientInfo={this.bindClient}
      />
    ) : (
      <Registration setClientInfo={this.bindClient} />
    );

    return (
      <div>
        {this.state.client ? (
          RoutingMechanism
        ) : (
          <>
            <p>Establishing Connection to Server...</p>
            <button onClick={this.clientConnector}>Retry Now</button>
          </>
        )}
      </div>
    );
  }
}

export default Gateway;

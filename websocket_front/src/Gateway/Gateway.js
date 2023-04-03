import React from "react";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";
import Message from "../Components/Message/Message";
import { retrieveRoutingKey } from "../KeyPairGenerator";
import Coords from "../Components/Coords/Coords";
import DataOperator from "../DataOperator";

class Gateway extends React.Component {
  constructor(props) {
    super(props);
    this.clientConnector = this.clientConnector.bind(this);
    this.successfulConnectionCallback =
      this.successfulConnectionCallback.bind(this);
    this.noConnectionCallback = this.noConnectionCallback.bind(this);
  }

  state = {
    client: null,
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
    this.setState((prevState) => ({ ...prevState, client: clientHelper }));
  }

  componentDidMount() {
    this.clientConnector();
  }

  render() {
    // Bind to plugin from backend...somehow :/
    const UniqueClientID = retrieveRoutingKey();
    // const UniqueKey1 = retrieveRoutingKey();
    // const UniqueKey2 = retrieveRoutingKey();

    const PluginKey = "96e8d6e7-bd3e-4043-a400-880ebd585d76";
    const PluginKey1 = "387c68da-e385-4c85-9de7-902608f42066";
    const PluginKey2 = "66c42078-9110-43f7-b154-c4a21ca8ef2d";

    const NewMessage = DataOperator(Message);
    const EnhancedCoords = DataOperator(Coords);

    return (
      <>
        {this.state.client ? (
          <div className="allComps">
            <div className="componentHouse">
              <NewMessage
                client={this.state.client}
                routingKey={PluginKey}
                uniqueClientID={UniqueClientID}
              />
            </div>

            <div className="componentHouse">
              <NewMessage
                client={this.state.client}
                routingKey={PluginKey1}
                uniqueClientID={UniqueClientID}
              />
            </div>

            <div className="componentHouse">
              <EnhancedCoords
                client={this.state.client}
                routingKey={PluginKey2}
                uniqueClientID={UniqueClientID}
              />
            </div>
          </div>
        ) : (
          <>
            <p>Establishing Connection to Server...</p>
            <button onClick={this.clientConnector}>Retry Now</button>
          </>
        )}
      </>
    );
  }
}

export default Gateway;

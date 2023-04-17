import React from "react";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";
import { retrieveRoutingKey } from "../KeyPairGenerator";
import DataOperator from "../DataOperator";
import Subtitler from "../Components/Subtitler/Subtitler";
import Coords from "../Components/Coords/Coords";

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
    clientID: retrieveRoutingKey(),
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
    this.client.disconnect();
  }

  render() {
    const PluginKey = "96e8d6e7-bd3e-4043-a400-880ebd585d76";
    const PluginKey1 = "387c68da-e385-4c85-9de7-902608f42066";
    const PluginKey2 = "66c42078-9110-43f7-b154-c4a21ca8ef2d";

    const EnhancedCoords = DataOperator(Coords);
    const EnhancedSubtitler = DataOperator(Subtitler);

    return (
      <>
        {this.state.client ? (
          <div className="allComps">
            {/* <div className="componentHouse">
              <EnhancedSubtitler
                client={this.state.client}
                routingKey={PluginKey}
                uniqueClientID={this.state.clientID}
              />
            </div> */}

            {/* <div className="componentHouse">
              <EnhancedSubtitler
                client={this.state.client}
                routingKey={PluginKey1}
                uniqueClientID={this.state.clientID}
              />
            </div> */}

            <div className="componentHouse">
              <EnhancedCoords
                client={this.state.client}
                routingKey={PluginKey2}
                uniqueClientID={this.state.clientID}
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

import Registration from "../Registration/Registration";
import React from "react";
import Renderer from "../Renderer/Renderer";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";
import PluginImporter from "../Utils/PluginImporter";
import PluginSetUpdater from "../PluginSetUpdater/PluginSetUpdater";

class Gateway extends React.Component {
  constructor(props) {
    super(props);
    this.clientConnector = this.clientConnector.bind(this);
    this.successfulConnectionCallback =
      this.successfulConnectionCallback.bind(this);
    this.noConnectionCallback = this.noConnectionCallback.bind(this);
    this.bindClient = this.bindClient.bind(this);
    this.retrievePluginKeys = this.retrievePluginDetails.bind(this);
  }

  state = {
    client: null,
    clientID: null,
    pluginDescriptors: null,
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

  async successfulConnectionCallback(clientHelper) {
    this.setState((prevState) => ({
      ...prevState,
      client: clientHelper,
    }));
    await this.retrievePluginDetails();
  }

  componentDidMount() {
    this.clientConnector();
    this.retrievePluginDetails();
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

  async retrievePluginDetails() {
    try {
      const rawKeys = await fetch("http://localhost:8080/plugins/get");
      const parsedKeys = await rawKeys.json();
      this.setState((prevState) => ({
        ...prevState,
        pluginDescriptors: parsedKeys,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const PluginBoundRenderer = PluginImporter(Renderer);

    const RoutingMechanism = this.state.clientID ? (
      <PluginBoundRenderer
        clientID={this.state.clientID}
        client={this.state.client}
        pluginDescriptors={this.state.pluginDescriptors}
        setClientInfo={this.bindClient}
      />
    ) : (
      <Registration setClientInfo={this.bindClient} />
    );

    return (
      <div>
        {this.state.client && this.state.clientID && (
          <PluginSetUpdater
            client={this.state.client}
            clientID={this.state.clientID}
          />
        )}
        {this.state.client && this.state.pluginDescriptors ? (
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

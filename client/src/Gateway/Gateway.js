import Registration from "../Registration/Registration";
import React from "react";
import Renderer from "../Renderer/Renderer";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";
import PluginImporter from "../ImportUtils/PluginImporter";
import { ClientContext, ClientIDContext } from "../Contexts/ClientContext";
import { NetworkIPContext } from "../Contexts/ServerIPContext";
// import PluginSetUpdater from "../PluginSetUpdater/PluginSetUpdater";

class Gateway extends React.Component {
  constructor(props) {
    super(props);
    this.clientConnector = this.clientConnector.bind(this);
    this.successfulConnectionCallback =
      this.successfulConnectionCallback.bind(this);
    this.noConnectionCallback = this.noConnectionCallback.bind(this);
    this.bindClient = this.bindClient.bind(this);
    this.retrievePluginKeys = this.retrievePluginDetails.bind(this);
    this.subscribeToPluginList = this.subscribeToPluginList.bind(this);
    this.networkAddress = `http://146.169.171.158:8080`;
  }

  state = {
    client: null,
    clientID: null,
    pluginDescriptors: null,
  };

  clientConnector() {
    const socket = new SockJS(`${this.networkAddress}/PlatformOcean`); // handshake with endpoint
    const clientHelper = Stomp.over(socket);
    // clientHelper.debug = () => {}; // avoid debug messages in console
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
    this.setState(
      (prevState) => ({
        ...prevState,
        client: clientHelper,
      }),
      () => {
        this.retrievePluginDetails();
        // TODO: BUGGY!!
        // this.subscribeToPluginList();
      }
    );
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

  subscribeToPluginList() {
    const SubscriberRoutingAddress = `/topic/newPlugins`;
    this.state.client.subscribe(SubscriberRoutingAddress, (resp) => {
      this.setState((prevState) => ({
        ...prevState,
        pluginDescriptors: JSON.parse(resp.body),
      }));
    });
  }

  async retrievePluginDetails() {
    try {
      const rawKeys = await fetch(`${this.networkAddress}/plugins/get`);
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
    // console.log(this.state.pluginDescriptors);

    const PluginBoundRenderer = PluginImporter(Renderer);

    const RoutingMechanism = this.state.clientID ? (
      <PluginBoundRenderer
        // clientID={this.state.clientID}
        // client={this.state.client}
        pluginDescriptors={this.state.pluginDescriptors}
        setClientInfo={this.bindClient}
      />
    ) : (
      <Registration setClientInfo={this.bindClient} />
    );

    return (
      <div>
        {/* {this.state.client && this.state.clientID && (
          <PluginSetUpdater
            client={this.state.client}
            clientID={this.state.clientID}
          />
        )} */}
        <ClientContext.Provider value={this.state.client}>
          <ClientIDContext.Provider value={this.state.clientID}>
            <NetworkIPContext.Provider value={this.networkAddress}>
              {this.state.client && this.state.pluginDescriptors ? (
                RoutingMechanism
              ) : (
                <div>
                  <p>Establishing Connection to Server...</p>
                  <button onClick={this.clientConnector}>Retry Now</button>
                </div>
              )}
            </NetworkIPContext.Provider>
          </ClientIDContext.Provider>
        </ClientContext.Provider>
      </div>
    );
  }
}

export default Gateway;

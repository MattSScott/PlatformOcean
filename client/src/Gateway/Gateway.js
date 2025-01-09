import React, { useState, useEffect } from "react";
import Renderer from "../Renderer/Renderer";
// import * as Stomp from "stompjs";
// import SockJS from "sockjs-client";
import PluginImporter from "../ImportUtils/PluginImporter";
import { ClientDataContext } from "../Contexts/ClientContext";
import { NetworkIPContext } from "../Contexts/ServerIPContext";
import ClientGenerator from "./ClientGenerator";

// class Gateway extends React.Component {
//   constructor(props) {
//     super(props);
//     this.clientConnector = this.clientConnector.bind(this);
//     this.successfulConnectionCallback =
//       this.successfulConnectionCallback.bind(this);
//     this.noConnectionCallback = this.noConnectionCallback.bind(this);
//     this.bindClient = this.bindClient.bind(this);
//     this.retrievePluginKeys = this.retrievePluginDetails.bind(this);
//     this.subscribeToPluginList = this.subscribeToPluginList.bind(this);
//     this.networkAddress = props.endpoint;
//   }

//   state = {
//     client: null,
//     clientID: null,
//     pluginDescriptors: null,
//   };

//   clientConnector() {
//     const socket = new SockJS(`${this.networkAddress}/PlatformOcean`); // handshake with endpoint
//     const clientHelper = Stomp.over(socket);
//     // clientHelper.debug = () => {}; // avoid debug messages in console
//     clientHelper.connect(
//       {},
//       () => this.successfulConnectionCallback(clientHelper),
//       this.noConnectionCallback
//     );
//   }

//   noConnectionCallback(error) {
//     console.log("STOMP: " + error);
//     setTimeout(this.clientConnector, 5000);
//     console.log("STOMP: Reconecting in 5 seconds");
//   }

//   async successfulConnectionCallback(clientHelper) {
//     this.setState(
//       (prevState) => ({
//         ...prevState,
//         client: clientHelper,
//       }),
//       () => {
//         this.retrievePluginDetails();
//         this.subscribeToPluginList();
//       }
//     );
//   }

//   componentDidMount() {
//     this.clientConnector();
//   }

//   componentWillUnmount() {
//     if (this.state.client) {
//       this.state.client.disconnect();
//     }
//   }

//   bindClient(clientInstance) {
//     this.setState((prevState) => ({
//       ...prevState,
//       clientID: clientInstance,
//     }));
//     localStorage.setItem("userID", clientInstance);
//   }

//   subscribeToPluginList() {
//     const SubscriberRoutingAddress = `/topic/newPlugins`;
//     this.state.client.subscribe(SubscriberRoutingAddress, (resp) => {
//       this.setState((prevState) => ({
//         ...prevState,
//         pluginDescriptors: JSON.parse(resp.body),
//       }));
//     });
//   }

//   async retrievePluginDetails() {
//     try {
//       const rawKeys = await fetch(`${this.networkAddress}/plugins/get`);
//       const parsedKeys = await rawKeys.json();
//       this.setState((prevState) => ({
//         ...prevState,
//         pluginDescriptors: parsedKeys,
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     // console.log(this.state.pluginDescriptors);

//     const PluginBoundRenderer = PluginImporter(Renderer);

//     const RoutingMechanism = this.state.clientID ? (
//       <PluginBoundRenderer
//         // clientID={this.state.clientID}
//         // client={this.state.client}
//         pluginDescriptors={this.state.pluginDescriptors}
//         setClientInfo={this.bindClient}
//       />
//     ) : (
//       <Registration setClientInfo={this.bindClient} />
//     );

//     return (
//       <div>
//         <ClientDataContext.Provider
//           value={{ client: this.state.client, clientID: this.state.clientID }}
//         >
//           <NetworkIPContext.Provider value={this.networkAddress}>
//             {this.state.client && this.state.pluginDescriptors ? (
//               RoutingMechanism
//             ) : (
//               <div>
//                 <p>Establishing Connection to Server...</p>
//                 <button onClick={this.clientConnector}>Retry Now</button>
//               </div>
//             )}
//           </NetworkIPContext.Provider>
//         </ClientDataContext.Provider>
//       </div>
//     );
//   }
// }

// export default Gateway;

// class Gateway extends React.Component {
//   constructor(props) {
//     super(props);
//     this.clientConnector = this.clientConnector.bind(this);
//     this.successfulConnectionCallback =
//       this.successfulConnectionCallback.bind(this);
//     this.noConnectionCallback = this.noConnectionCallback.bind(this);
//     this.bindClient = this.bindClient.bind(this);
//     this.retrievePluginKeys = this.retrievePluginDetails.bind(this);
//     this.subscribeToPluginList = this.subscribeToPluginList.bind(this);
//     this.networkAddress = props.endpoint;
//   }

export default function Gateway({ endpoint, clientState }) {
  console.log(clientState);

  const client = ClientGenerator(endpoint);
  const [pluginDescriptors, setPluginDescriptors] = useState([]);

  useEffect(() => {
    const subscribeToPluginList = () => {
      const SubscriberRoutingAddress = `/topic/newPlugins`;
      client &&
        client.subscribe(SubscriberRoutingAddress, (resp) => {
          const parsedPlugins = JSON.parse(resp.body);
          setPluginDescriptors(parsedPlugins);
        });
    };

    const retrievePluginDetails = async () => {
      try {
        const rawKeys = await fetch(`${endpoint}/plugins/get`);
        const parsedKeys = await rawKeys.json();
        setPluginDescriptors(parsedKeys);
      } catch (error) {
        console.log(error);
      }
    };

    subscribeToPluginList();
    retrievePluginDetails();
  }, [client, endpoint]);

  const PluginBoundRenderer = PluginImporter(Renderer);

  if (!clientState.id) {
    return <p>Client State went wrong...</p>;
  }

  return (
    <div>
      <ClientDataContext.Provider
        value={{ client: client, clientID: clientState.id }}
      >
        <NetworkIPContext.Provider value={endpoint}>
          {client && pluginDescriptors ? (
            <PluginBoundRenderer pluginDescriptors={pluginDescriptors} />
          ) : (
            <div>
              <p>Establishing Connection to Server...</p>
              {/* <button onClick={clientConnector}>Retry Now</button> */}
            </div>
          )}
        </NetworkIPContext.Provider>
      </ClientDataContext.Provider>
    </div>
  );
}

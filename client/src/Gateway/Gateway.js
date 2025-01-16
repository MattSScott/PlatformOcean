import React, { useState, useEffect } from "react";
import Renderer from "../Renderer/Renderer";
import { ClientDataContext } from "../Contexts/ClientContext";
import { NetworkIPContext } from "../Contexts/ServerIPContext";
import ClientGenerator from "./ClientGenerator";

export default function Gateway({ endpoint, clientState }) {
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
            <Renderer pluginDescriptors={pluginDescriptors} />
          ) : (
            <div>
              <p>Establishing Connection to Server...</p>
            </div>
          )}
        </NetworkIPContext.Provider>
      </ClientDataContext.Provider>
    </div>
  );
}

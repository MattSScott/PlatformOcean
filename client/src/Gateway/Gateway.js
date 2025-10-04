import React, { useState, useEffect } from "react";
import Renderer from "../Renderer/Renderer";
import { ClientDataContext } from "../Contexts/ClientContext";
import { NetworkIPContext } from "../Contexts/ServerIPContext";
import ClientGenerator from "./ClientGenerator";

export default function Gateway({ endpoint, clientState, username }) {
  const client = ClientGenerator(endpoint);
  const [pluginDescriptors, setPluginDescriptors] = useState([]);

  useEffect(() => {
    if (!client) return;

    const retrievePluginDetails = async () => {
      try {
        const rawKeys = await fetch(`${endpoint}/plugins/get`);
        const parsedKeys = await rawKeys.json();
        setPluginDescriptors(parsedKeys);
      } catch (error) {
        console.log(error);
      }
    };

    const SubscriberRoutingAddress = `/topic/newPlugins`;
    const subscription = client.subscribe(SubscriberRoutingAddress, (resp) => {
      setPluginDescriptors(JSON.parse(resp.body));
    });

    retrievePluginDetails();

    return () => {
      subscription.unsubscribe();
    };
  }, [client, endpoint]);

  if (!clientState?.id) {
    return <p>Client State went wrong...</p>;
  }

  return (
    <div>
      <ClientDataContext.Provider
        value={{
          client: client,
          clientID: clientState?.id,
          clientRole: clientState?.role,
          username: username,
        }}
      >
        <NetworkIPContext.Provider value={endpoint}>
          {client ? (
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

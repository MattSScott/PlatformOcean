import React, { useContext } from "react";
import PluginAdder from "../PluginAdder/PluginAdder";
import "./Renderer.css";
import { ClientDataContext } from "../Contexts/ClientContext";
import { NetworkIPContext } from "../Contexts/ServerIPContext";

export default function Renderer({ loadedPlugins }) {
  const clientContext = useContext(ClientDataContext);
  const networkAddress = useContext(NetworkIPContext);

  return (
    <div className="renderer">
      <div className="logout">
        <PluginAdder networkAddress={networkAddress} />
        <p>Signed in as: {`${clientContext.clientID.substring(0, 8)}...`}</p>
      </div>
      <div className="allComps">{loadedPlugins}</div>
    </div>
  );
}

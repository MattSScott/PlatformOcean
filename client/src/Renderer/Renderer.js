import React from "react";
import PluginAdder from "../PluginAdder/PluginAdder";
import "./Renderer.css";
import { ClientDataContext } from "../Contexts/ClientContext";

class Renderer extends React.Component {
  render() {
    return (
      <div className="renderer">
        <div className="logout">
          <PluginAdder />
          <ClientDataContext.Consumer>
            {({ clientID }) => (
              <p>Signed in as: {`${clientID.substring(0, 8)}...`}</p>
            )}
          </ClientDataContext.Consumer>
        </div>
        <div className="allComps">{this.props.loadedPlugins}</div>
      </div>
    );
  }
}

export default Renderer;

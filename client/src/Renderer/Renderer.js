import React, { lazy } from "react";
import Button from "@mui/material/Button";

import DataOperator from "../Utils/DataOperator";

import "./Renderer.css";

class Renderer extends React.Component {
  constructor(props) {
    super(props);
    this.triggerLogout = this.triggerLogout.bind(this);
    this.setPlugins = this.setPlugins.bind(this);
  }

  state = {
    client: this.props.client,
    clientID: this.props.clientID,
    pluginKeys: this.props.pluginKeys,
    plugins: [],
  };

  componentDidMount() {
    const plugins = ["Coords", "Message", "Subtitler"];
    this.loadPlugins(plugins);
  }

  triggerLogout() {
    this.props.setClientInfo(null);
    localStorage.clear();
  }

  async importPlugin(plugin) {
    return lazy(() =>
      import(`../Components/${plugin}/${plugin}`).catch((err) =>
        console.log(err)
      )
    );
  }

  setPlugins(pluginsReturned) {
    this.setState((prevState) => ({ ...prevState, plugins: pluginsReturned }));
  }

  async loadPlugins(pluginNames) {
    const componentPromises = pluginNames.map(async (plugin, ind) => {
      const Plugin = await this.importPlugin(plugin);
      const EnhancedPlugin = DataOperator(Plugin);
      return (
        <div className="componentHouse" key={this.state.pluginKeys[ind]}>
          <EnhancedPlugin
            client={this.state.client}
            routingKey={this.state.pluginKeys[ind]}
            uniqueClientID={this.state.clientID}
          />
        </div>
      );
    });
    Promise.all(componentPromises).then(this.setPlugins);
  }

  render() {
    return (
      <>
        <div className="logout">
          <p>Signed in as: {`${this.state.clientID.substring(0, 8)}...`}</p>
          <Button variant="contained" onClick={this.triggerLogout}>
            Logout
          </Button>
        </div>
        <div className="allComps">
          {/* {Object.values(AllComponents).map((val, i) => {
            const EnhancedComp = DataOperator(val);
            return (
              <div className="componentHouse" key={this.state.pluginKeys[i]}>
                <EnhancedComp
                  client={this.state.client}
                  routingKey={this.state.pluginKeys[i]}
                  uniqueClientID={this.state.clientID}
                />
              </div>
            );
          })} */}

          {this.state.plugins}
        </div>
      </>
    );
  }
}

export default Renderer;

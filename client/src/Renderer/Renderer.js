import React from "react";
import Button from "@mui/material/Button";

import DataOperator from "../Utils/DataOperator";

import * as AllComponents from "../Components";

import "./Renderer.css";

class Renderer extends React.Component {
  constructor(props) {
    super(props);
    this.triggerLogout = this.triggerLogout.bind(this);
  }

  state = {
    client: this.props.client,
    clientID: this.props.clientID,
    pluginKeys: this.props.pluginKeys,
  };

  triggerLogout() {
    this.props.setClientInfo(null);
    localStorage.clear();
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
          {Object.values(AllComponents).map((val, i) => {
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
          })}

          {/* <div className="componentHouse">
            <EnhancedSubtitler
              client={this.state.client}
              routingKey={PluginKey}
              uniqueClientID={this.state.clientID}
            />
          </div>

          {/* <div className="componentHouse">
              <EnhancedSubtitler
                client={this.state.client}
                routingKey={PluginKey1}
                uniqueClientID={this.state.clientID}
              />
            </div> */}

          {/* <div className="componentHouse">
            <EnhancedCoords
              client={this.state.client}
              routingKey={PluginKey2}
              uniqueClientID={this.state.clientID}
            />
          </div> } */}
        </div>
      </>
    );
  }
}

export default Renderer;

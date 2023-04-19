import React from "react";
import Button from "@mui/material/Button";

import DataOperator from "../DataOperator";
import Subtitler from "../Components/Subtitler/Subtitler";
import Coords from "../Components/Coords/Coords";

import "./Renderer.css";

class Renderer extends React.Component {
  constructor(props) {
    super(props);
    this.triggerLogout = this.triggerLogout.bind(this);
  }

  state = {
    client: this.props.client,
    clientID: this.props.clientID,
  };

  triggerLogout() {
    this.props.setClientInfo(null);
    localStorage.clear();
  }

  render() {
    const PluginKey = "96e8d6e7-bd3e-4043-a400-880ebd585d76";
    // const PluginKey1 = "387c68da-e385-4c85-9de7-902608f42066";
    const PluginKey2 = "66c42078-9110-43f7-b154-c4a21ca8ef2d";

    const EnhancedCoords = DataOperator(Coords);
    const EnhancedSubtitler = DataOperator(Subtitler);

    return (
      <>
        <div className="logout">
          <p>Signed in as: {`${this.state.clientID.substring(0, 8)}...`}</p>
          <Button variant="contained" onClick={this.triggerLogout}>
            Logout
          </Button>
        </div>
        <div className="allComps">
          <div className="componentHouse">
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

          <div className="componentHouse">
            <EnhancedCoords
              client={this.state.client}
              routingKey={PluginKey2}
              uniqueClientID={this.state.clientID}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Renderer;

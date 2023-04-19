import React from "react";

import DataOperator from "../DataOperator";
import Subtitler from "../Components/Subtitler/Subtitler";
import Coords from "../Components/Coords/Coords";

class Renderer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    client: this.props.client,
    clientID: this.props.clientID,
  };

  render() {
    const PluginKey = "96e8d6e7-bd3e-4043-a400-880ebd585d76";
    // const PluginKey1 = "387c68da-e385-4c85-9de7-902608f42066";
    const PluginKey2 = "66c42078-9110-43f7-b154-c4a21ca8ef2d";

    const EnhancedCoords = DataOperator(Coords);
    const EnhancedSubtitler = DataOperator(Subtitler);

    return (
      <>
        <p>Signed in as: {this.state.clientID}</p>
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

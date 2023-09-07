import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import { ClientContext, ClientIDContext } from "../Contexts/ClientContext";

export default class PluginStacker extends React.Component {
  constructor() {
    super();
    this.cycleLeft = this.cycleLeft.bind(this);
    this.cycleRight = this.cycleRight.bind(this);
  }

  state = {
    currentIdx: 0,
  };

  recalculateIdx(idx, change, cycleLength) {
    let newIdx = idx + change;
    if (newIdx < 0) {
      newIdx += cycleLength;
    }
    return newIdx % cycleLength;
  }

  cycleLeft() {
    const CycleLength = this.props.plugins.length;
    this.setState((prevState) => ({
      ...prevState,
      currentIdx: this.recalculateIdx(prevState.currentIdx, -1, CycleLength),
    }));
  }

  cycleRight() {
    const CycleLength = this.props.plugins.length;
    this.setState((prevState) => ({
      ...prevState,
      currentIdx: this.recalculateIdx(prevState.currentIdx, 1, CycleLength),
    }));
  }

  render() {
    const PluginArray = this.props.plugins.map(({ plugin, key }, idx) => {
      const ToggleablePlugin = plugin;
      return (
        <ClientContext.Consumer key={key}>
          {(client) => (
            <ClientIDContext.Consumer>
              {(clientID) => (
                <div
                  className="componentHouse"
                  style={{
                    display: idx == this.state.currentIdx ? "" : "none",
                  }}
                >
                  <ToggleablePlugin
                    routingKey={key}
                    client={client}
                    clientID={clientID}
                  />
                </div>
              )}
            </ClientIDContext.Consumer>
          )}
        </ClientContext.Consumer>
      );
    });

    return (
      <div>
        {PluginArray}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button onClick={this.cycleLeft}>
            <ArrowBackIcon />
          </Button>
          <Button onClick={this.cycleRight}>
            <ArrowForwardIcon />
          </Button>
        </div>
      </div>
    );
  }
}

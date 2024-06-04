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
                    display: idx === this.state.currentIdx ? "" : "none",
                  }}
                >
                  {/* TODO: work out how to attach props */}
                  {ToggleablePlugin}
                  {/* <ToggleablePlugin
                    routingKey={key}
                    client={client}
                    uniqueClientID={clientID}
                  /> */}
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
        {this.props.plugins.length > 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={this.cycleLeft}
              style={{ marginRight: "5px" }}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={this.cycleRight}
              style={{ marginLeft: "5px" }}
            >
              <ArrowForwardIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

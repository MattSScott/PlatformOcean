import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import "./pluginStyle.css";

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
    const PluginArray = this.props.plugins.map((Plugin, idx) => (
      <div
        key={`stack_box_${idx}`}
        className="componentHouse"
        style={{
          display: idx === this.state.currentIdx ? "" : "none",
        }}
      >
        {Plugin}
      </div>
    ));

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

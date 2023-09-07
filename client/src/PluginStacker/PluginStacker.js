import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";

class PluginStacker extends React.Component {
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
    return (
      <div>
        {this.props.plugins[this.state.currentIdx]}
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

import React from "react";

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
          <button onClick={this.cycleLeft}>Left Arrow</button>
          <button onClick={this.cycleRight}>Right Arrow</button>
        </div>
      </div>
    );
  }
}

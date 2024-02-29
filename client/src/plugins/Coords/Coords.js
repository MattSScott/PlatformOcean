import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import "./Coords.css";

export default class Coords extends PluginWrapper {
  constructor() {
    super();
    this.getPos = this.getPos.bind(this);
  }

  getPos(event) {
    var rect = event.target.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  render() {
    let dHist = this.getDataHistory();
    console.log(dHist);
    let dLen = dHist ? dHist.length : 0;

    let prevCirc = null;
    let prevCircButOne = null;

    if (dLen >= 2) {
      prevCirc = dHist[dLen - 2];
    }

    if (dLen >= 3) {
      prevCircButOne = dHist[dLen - 3];
    }

    return (
      <div
        className="coordDiv"
        onClick={(e) => {
          var obj = this.getPos(e);
          this.sendDataToBackend(obj, true);
        }}
      >
        <p>Click Within Box to "Poke" Users</p>
        <svg>
          {this.getData() && (
            <circle
              cy={this.getData().y}
              cx={this.getData().x}
              r="30"
              fill="red"
            ></circle>
          )}

          {prevCirc && (
            <circle
              cy={prevCirc.message.y}
              cx={prevCirc.message.x}
              r="30"
              fill="blue"
            ></circle>
          )}

          {prevCircButOne && (
            <circle
              cy={prevCircButOne.message.y}
              cx={prevCircButOne.message.x}
              r="30"
              fill="green"
            ></circle>
          )}
        </svg>
      </div>
    );
  }
}

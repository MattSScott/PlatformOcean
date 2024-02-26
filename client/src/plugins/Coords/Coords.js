import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import "./Coords.css";

export default class Coords extends PluginWrapper {
  constructor() {
    super();
    this.getPos = this.getPos.bind(this);
  }
  state = {
    ...this.state,
    L: 0,
    prevCirc: this.getData(),
    prevCircButOne: this.getData(),
  };

  componentDidMount() {
    console.log(this.state.dataHistory);
    // this.setState((prevState) => ({
    //   ...prevState,
    //   L: this.state.dataHistory.length,
    // }));
    if (this.state.L >= 2) {
      this.state.prevCirc = this.state.dataHistory[this.state.L - 2];
    }

    if (this.state.L >= 3) {
      this.prevCircButOne = this.state.dataHistory[this.state.L - 3];
    }
  }

  getPos(event) {
    var rect = event.target.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  render() {
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
          {this.data && (
            <>
              <circle
                cy={this.data.y}
                cx={this.data.x}
                r="30"
                fill="red"
              ></circle>

              <circle
                cy={this.state.prevCirc.y}
                cx={this.state.prevCirc.x}
                r="30"
                fill="blue"
              ></circle>

              <circle
                cy={this.state.prevCircButOne.y}
                cx={this.state.prevCircButOne.x}
                r="30"
                fill="green"
              ></circle>
            </>
          )}
        </svg>
      </div>
    );
  }
}

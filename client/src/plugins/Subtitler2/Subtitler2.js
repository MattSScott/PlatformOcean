import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import "./Subtitler2.css";

export default class Subtitler2 extends PluginWrapper {
  constructor() {
    super();
    this.sendHost = this.sendHost.bind(this);
  }

  state = {
    isHost: false,
  };

  handleCreateMessage(data) {
    if (data.message.content === "host" && !this.isMe()) {
      this.setState((prevState) => ({
        ...prevState,
        isHost: false,
      }));
    }
  }

  sendHost() {
    const message = { content: "host" };
    this.sendDataToBackend(message, false);
    this.setState((prevState) => ({
      ...prevState,
      isHost: true,
    }));
  }

  render() {
    return (
      <div className="subtitler">
        <div className="subtitleArea">
          <p>{this.getData((d) => d.content !== "host" && d)}</p>
        </div>
        <div className="inputArea">
          {this.state.isHost ? (
            <form>
              <input
                onChange={(e) => {
                  this.sendDataToBackend(e.target.value, false);
                }}
              />
            </form>
          ) : (
            <button className="subButton" onClick={this.sendHost}>
              Become Host
            </button>
          )}
        </div>
      </div>
    );
  }
}

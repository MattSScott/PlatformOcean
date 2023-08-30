import PluginWrapper from "../../PluginWrapper/PluginWrapper";
import "./Subtitler2.css";

export default class Subtitler2 extends PluginWrapper {
  constructor() {
    super();
    this.sendHost = this.sendHost.bind(this);
  }

  state = {
    ...this.state,
    isHost: false,
  };

  handleMessageReceived(data) {
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
          {/* TODO: pass function into this.getData() */}
          <p>
            {this.getData() &&
              this.getData().content !== "host" &&
              this.getData()}
          </p>
        </div>
        <div className="inputArea">
          {this.state.isHost ? (
            <form>
              <input
                onChange={(e) => {
                  console.log(e.target.value);
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

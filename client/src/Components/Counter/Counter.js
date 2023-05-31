import PluginWrapper from "../../PluginWrapper/PluginWrapper";

class Counter extends PluginWrapper {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
  }

  count() {
    // current count is most recent message (and check if data has already been sent)
    const currentCount = this.getData() || 0;
    // get count from previous message and increment
    const nextCount = currentCount + 1;
    // send count back to other users (and don't log)
    this.sendDataToBackend(nextCount, false);
  }

  render() {
    return (
      <div>
        <p>{this.getData() || 0}</p>
        <button onClick={this.count}>Increment</button>
      </div>
    );
  }
}

export default Counter;

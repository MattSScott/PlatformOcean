import PluginWrapper from "../../PluginWrapper/PluginWrapper";

class TestComp extends PluginWrapper {
  constructor(props) {
    super(props);
    this.sendTestMessage = this.sendTestMessage.bind(this);
  }

  sendTestMessage() {
    this.sendDataToBackend("Message sent and received!", false);
  }

  render() {
    return (
      <div>
        <p>
          {this.getData() && `${this.getData()} \n from \n ${this.getSender()}`}
        </p>
        <button onClick={this.sendTestMessage}>Click Me!</button>
      </div>
    );
  }
}

export default TestComp;

// export default function TestComp({ sender, data }) {
//   const sendTestMessage = () => {
//     sender("Message sent and received!", false);
//   };

//   return (
//     <div>
//       <p>{data && `${data.message} \n from \n ${data.sender}`}</p>
//       <button onClick={sendTestMessage}>Click Me!</button>
//     </div>
//   );
// }

import "./App.css";
import MessageList from "./Components/MessageList";
import MessageSubmit from "./Components/MessageSubmit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Messages</h2>
        <MessageList />
        <h2>Submit Message</h2>
        <MessageSubmit />
      </header>
    </div>
  );
}

export default App;

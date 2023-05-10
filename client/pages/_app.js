import "./App.css";
import "./index.css";
import Gateway from "./Gateway/Gateway";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Gateway />
      </header>
    </div>
  );
}

export default App;

// Example implementation: components.map( comp => client + uniqueKey, returns <SS client, uniqueKey> <COMP/> <SS/>)

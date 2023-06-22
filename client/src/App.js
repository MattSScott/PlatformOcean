import "./App.css";
import Gateway from "./Gateway/Gateway";
import { useState } from "react";
import ServerContext from "./Utils/ServerContext";
import ServerSelector from "./ServerSelector/ServerSelector";

function App() {
  const [serverAddress, setServerAddress] = useState("http://localhost:3000");

  return (
    <div className="App">
      <header className="App-header">
        <ServerContext.Provider
          value={{ add: serverAddress, setAdd: setServerAddress }}
        >
          <ServerSelector />
          <Gateway />
        </ServerContext.Provider>
      </header>
    </div>
  );
}

export default App;

// Example implementation: components.map( comp => client + uniqueKey, returns <SS client, uniqueKey> <COMP/> <SS/>)

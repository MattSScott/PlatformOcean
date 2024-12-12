import React, { useState } from "react";
import "./App.css";
import Gateway from "./Gateway/Gateway";
import Multicaster from "./ServiceDiscovery/Multicaster";

function App() {
  const [isDiscovering, setIsDiscovering] = useState(true);
  const [endpoint, setEndpoint] = useState(null);

  const bindEndpoint = (chosenEndpoint) => {
    setIsDiscovering(false);
    setEndpoint(chosenEndpoint);
  };

  return (
    <div className="App">
      <div style={{ margin: "20px", borderBottom: "1px solid #ddd" }}>
        <h1>Platform Ocean!</h1>
      </div>
      <header className="App-header">
        {isDiscovering ? (
          <Multicaster bindEndpoint={bindEndpoint} />
        ) : (
          <Gateway endpoint={endpoint} />
        )}
      </header>
    </div>
  );
}

export default App;

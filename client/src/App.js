import "./App.css";
import React from "react";
import Gateway from "./Gateway/Gateway";

function App() {
  window.React = React;
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

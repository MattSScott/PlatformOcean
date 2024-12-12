import React, { useState } from "react";
import "./App.css";
import Gateway from "./Gateway/Gateway";
import Multicaster from "./ServiceDiscovery/Multicaster";
import { Typography } from "@mui/material";

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
        <Typography
          variant="h2"
          sx={{
            marginBottom: "20px",
            fontWeight: 700, // Bold weight
            padding: "10px", // Padding for the background
            borderRadius: "16px", // Rounded corners
          }}
        >
          <span
            style={{
              color: "rgb(0, 157, 219)", // A green color
            }}
          >
            Platform
          </span>
          <span
            style={{
              color: "rgb(1, 92, 159)", // A green color
            }}
          >
            Ocean
          </span>
        </Typography>
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

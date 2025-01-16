import React, { useState, useContext } from "react";
import { Slider } from "@mui/material";
import PluginAdder from "../PluginAdder/PluginAdder";
import { useClientDataContext } from "../Contexts/ClientContext";
import { NetworkIPContext } from "../Contexts/ServerIPContext";
import "./Renderer.css";

export default function Renderer({ loadedPlugins }) {
  const { clientID } = useClientDataContext();
  const networkAddress = useContext(NetworkIPContext);
  const [slider, setSlider] = useState(3);

  const handleChange = (_event, newValue) => {
    setSlider(newValue);
  };

  return (
    <div className="renderer">
      <div className="logout">
        <PluginAdder networkAddress={networkAddress} />
        <p>Signed in as: {`${clientID.substring(0, 8)}...`}</p>
        <Slider
          aria-label="Columns"
          valueLabelDisplay="auto"
          value={slider}
          marks={true}
          onChange={handleChange}
          min={2}
          max={4}
          sx={{ width: "200px" }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${slider}, 1fr)`, // Dynamic column count
          gap: "20px", // Spacing between items
        }}
      >
        {loadedPlugins}
      </div>
    </div>
  );
}

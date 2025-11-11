import React, { useState } from "react";
import { Slider } from "@mui/material";
import PluginAdder from "../PluginAdder/PluginAdder";
import { useClientDataContext } from "../Contexts/ClientContext";
import { PluginRegistryProvider } from "../Contexts/PluginRegistryContext";
import PluginImporter from "../ImportUtils/PluginImporter";
import PluginStacker from "../ImportUtils/PluginStacker";
import "./Renderer.css";

export default function Renderer({ pluginDescriptors }) {
  const { clientID, username } = useClientDataContext();
  const [slider, setSlider] = useState(3);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const clientIDSubs = `${clientID.substring(0, 8)}...`;

  const PluginStackerArray = PluginImporter(pluginDescriptors);

  const handleChange = (_event, newValue) => {
    setSlider(newValue);
  };

  return (
    <div className="renderer">
      <div className="logout">
        <PluginAdder />
        <p
          onMouseEnter={() => setMouseIsOver(true)}
          onMouseLeave={() => setMouseIsOver(false)}
        >
          Signed in as: <b>{mouseIsOver ? clientIDSubs : username}</b>
        </p>
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
        <PluginRegistryProvider platformHash={pluginDescriptors}>
          {Object.values(PluginStackerArray).map((pluginKeyPair, idx) => (
            <PluginStacker plugins={pluginKeyPair} key={`stacker-${idx}`} />
          ))}
        </PluginRegistryProvider>
      </div>
    </div>
  );
}

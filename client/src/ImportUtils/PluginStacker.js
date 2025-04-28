import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import "./pluginStyle.css";

export default function PluginStacker({ plugins }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const cycleLength = plugins.length;

  const recalculateIdx = (idx, change) => {
    let newIdx = idx + change;
    if (newIdx < 0) {
      newIdx += cycleLength;
    }
    return newIdx % cycleLength;
  };

  const cycleLeft = () => {
    setCurrentIdx((prev) => recalculateIdx(prev, -1));
  };

  const cycleRight = () => {
    setCurrentIdx((prev) => recalculateIdx(prev, 1));
  };

  const PluginArray = plugins.map((Plugin, idx) => (
    <div
      key={`stack_box_${idx}`}
      className="componentHouse"
      style={{
        display: idx === currentIdx ? "" : "none",
        boxShadow:
          cycleLength > 1
            ? "5px -5px 10px rgba(0, 0, 0, 0.6), 5px 5px 15px rgba(0, 0, 0, 0.4)"
            : "none",
      }}
    >
      {Plugin}
    </div>
  ));

  return (
    <div>
      {PluginArray}
      {cycleLength > 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={cycleLeft}
            style={{ marginRight: "5px" }}
          >
            <ArrowBackIcon />
          </Button>
          <h3
            style={{
              margin: "0 10px 0 10px",
            }}
          >
            {currentIdx + 1}
          </h3>
          <Button
            variant="outlined"
            onClick={cycleRight}
            style={{ marginLeft: "5px" }}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
      )}
    </div>
  );
}

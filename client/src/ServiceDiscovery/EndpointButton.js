import React from "react";
import { Button } from "@mui/material";

export default function EndpointButton({ endpoint, owner, bindEndpoint }) {
  const performBind = () => {
    bindEndpoint(endpoint);
  };

  return (
    <Button
      variant="contained"
      sx={{
        position: "relative",
        padding: "10px 20px",
        margin: "50px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const tooltip = e.target.querySelector(".endpoint-tooltip");
        tooltip.style.opacity = 1;
        tooltip.style.visibility = "visible";
      }}
      onMouseLeave={(e) => {
        const tooltip = e.target.querySelector(".endpoint-tooltip");
        tooltip.style.opacity = 0;
        tooltip.style.visibility = "hidden";
      }}
      onClick={performBind}
    >
      {`${owner}'s Platform`}
      <span
        className="endpoint-tooltip"
        style={{
          position: "absolute",
          bottom: "110%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#333",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          opacity: 0,
          pointerEvents: "none",
          visibility: "hidden",
          transition: "opacity 0.3s, visibility 0.3s",
          zIndex: 1,
        }}
      >
        {endpoint}
      </span>
    </Button>
  );
}

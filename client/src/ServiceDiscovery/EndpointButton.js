import React, { useEffect } from "react";
import { Button } from "@mui/material";

export default function EndpointButton({
  userData,
  endpoint,
  owner,
  bindEndpoint,
}) {
  const performBind = () => {
    bindEndpoint(endpoint);
  };

  useEffect(() => {
    const fetchEndpointData = async () => {
      try {
        const RegistrationAddress = `${endpoint}/registry/get`;
        const response = await fetch(RegistrationAddress, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const UUID_Resp = await response.json();
        console.log(UUID_Resp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEndpointData();
  }, [endpoint, userData]);

  return (
    <Button
      variant="contained"
      sx={{
        position: "relative",
        padding: "10px 20px",
        margin: "20px",
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

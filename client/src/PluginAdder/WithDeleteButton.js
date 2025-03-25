import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";
import { useClientDataContext } from "../Contexts/ClientContext";

export function WithDeleteButton(Plugin) {
  return function PluginWithButton(props) {
    const { clientRole } = useClientDataContext();
    const isOwner = clientRole === "OWNER";
    const [isHovered, setIsHovered] = useState(false);
    const NetworkIP = useNetworkIPContext();
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const pluginRemovalRequest = async () => {
      const pluginEndpoint = `${NetworkIP}/plugins/remove`;
      const response = await fetch(pluginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.pluginKey),
      });

      console.log(response);
      // console.log(props, props.pluginKey);
    };

    return (
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isOwner && isHovered && (
          <Button
            variant="contained"
            color="error"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
              minWidth: "20px",
              minHeight: "20px",
              maxWidth: "35px",
              maxHeight: "35px",
            }}
            onClick={pluginRemovalRequest}
          >
            <DeleteForeverIcon />
          </Button>
        )}
        <Plugin {...props} />
      </div>
    );
  };
}

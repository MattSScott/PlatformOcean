import React, { useState } from "react";
import { Button } from "@mui/material";

export function WithDeleteButton(Plugin) {
  return function PluginWithButton(props) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const tester = () => {
      console.log(props, props.pluginKey);
    };

    return (
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
          <Button
            variant="contained"
            color="error"
            sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
            onClick={tester}
          >
            -
          </Button>
        )}
        <Plugin {...props} />
      </div>
    );
  };
}

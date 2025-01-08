import React from "react";
import { Typography } from "@mui/material";

export default function StyledHeader() {
  return (
    <Typography
      variant="h2"
      sx={{
        marginBottom: "20px",
        fontWeight: 700,
        padding: "10px",
        borderRadius: "16px",
      }}
    >
      <span
        style={{
          color: "rgb(0, 157, 219)",
        }}
      >
        Platform
      </span>
      <span
        style={{
          color: "rgb(1, 92, 159)",
        }}
      >
        Ocean
      </span>
    </Typography>
  );
}

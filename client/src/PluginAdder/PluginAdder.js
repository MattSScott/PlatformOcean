import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function PluginAdder({ networkAddress }) {
  const [pluginURL, setPluginURL] = useState("");

  const updatePluginText = (event) => {
    setPluginURL(event.target.value);
  };

  const sendPluginPayload = async () => {
    const body = {
      pluginName: "toggler",
      pluginURL: pluginURL,
    };

    // TODO: add checking for validity of send?

    const pluginEndpoint = `${networkAddress}/plugins/add`;

    const response = await fetch(pluginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(response);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <TextField
        label="Plugin URL"
        variant="outlined"
        onChange={updatePluginText}
      />
      <Button variant="contained" color="primary" onClick={sendPluginPayload}>
        Add
      </Button>
    </Stack>
  );
}

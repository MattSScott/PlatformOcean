import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useClientDataContext } from "../Contexts/ClientContext";

export default function PluginAdder({ networkAddress }) {
  const [pluginName, setPluginName] = useState("");
  const { clientRole } = useClientDataContext();
  const isOwner = clientRole === "OWNER";

  const updatePluginText = (e) => {
    setPluginName(e.target.value);
  };

  const sendPluginPayload = async () => {
    const body = {
      pluginName: pluginName,
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
    isOwner && (
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <TextField
          label="Plugin ID"
          variant="outlined"
          onChange={updatePluginText}
        />
        <Button variant="contained" color="primary" onClick={sendPluginPayload}>
          Add
        </Button>
      </Stack>
    )
  );
}

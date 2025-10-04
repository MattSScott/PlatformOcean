import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useClientDataContext } from "../Contexts/ClientContext";
import AddPlugin from "./AddPlugin";

export default function PluginAdder() {
  const [pluginName, setPluginName] = useState("");
  const { clientRole } = useClientDataContext();
  const isOwner = clientRole === "OWNER";

  const updatePluginText = (e) => {
    setPluginName(e.target.value);
  };

  // add a plugin with no other subscriptions
  const sendPluginPayload = AddPlugin(pluginName, []);

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

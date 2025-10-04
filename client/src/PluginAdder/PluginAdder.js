import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useClientDataContext } from "../Contexts/ClientContext";
import addPlugin from "./AddPlugin";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";

export default function PluginAdder() {
  const [pluginName, setPluginName] = useState("");
  const { clientRole } = useClientDataContext();
  const isOwner = clientRole === "OWNER";
  const NetworkIP = useNetworkIPContext();

  const updatePluginText = (e) => {
    setPluginName(e.target.value);
  };

  // add a plugin with no other subscriptions
  const sendPluginPayload = () => {
    addPlugin(NetworkIP, pluginName, []);
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

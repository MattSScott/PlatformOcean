import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LinkIcon from "@mui/icons-material/Link";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";
import { useClientDataContext } from "../Contexts/ClientContext";
import addPlugin from "./AddPlugin";

export function WithPluginControls(Plugin) {
  return function PluginWithButton(props) {
    const { clientRole } = useClientDataContext();
    const isOwner = clientRole === "OWNER";
    const NetworkIP = useNetworkIPContext();

    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [pluginText, setPluginText] = useState("");
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

    const handleDialogClose = () => {
      setIsDialogOpen(false);
    };

    const handlePluginSubmit = () => {
      addPlugin(NetworkIP, pluginText, [props.pluginKey]);
      handleDialogClose();
    };

    return (
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Delete button in top right */}
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

        {/* Link button middle-right */}
        {isOwner && isHovered && (
          <Button
            variant="contained"
            color="success"
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              minWidth: "20px",
              minHeight: "20px",
              maxWidth: "35px",
              maxHeight: "35px",
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            <LinkIcon />
          </Button>
        )}

        <Plugin {...props} />

        {/* Dialog to select target plugin */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Select plugin to link</DialogTitle>
          <DialogContent>
            {/* <Select
              value={selectedPlugin}
              onChange={(e) => setSelectedPlugin(e.target.value)}
              fullWidth
            >
              {availablePlugins.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select> */}
            <TextField
              label="Plugin ID"
              variant="outlined"
              onChange={(e) => setPluginText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handlePluginSubmit}
              variant="contained"
              color="success"
            >
              Link
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}

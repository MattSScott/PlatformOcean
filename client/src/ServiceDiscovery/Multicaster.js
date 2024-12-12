import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EndpointButton from "./EndpointButton";

export default function Multicaster({ bindEndpoint }) {
  const [endpointList, setEndpointList] = useState([]);
  const [manualIp, setManualIp] = useState("192.168.0.43");
  const [manualPort, setManualPort] = useState(8080);
  const [dialogOpen, setDialogOpen] = useState(false);

  const ServerStatusState = {
    WAITING: 0,
    LOADING: 1,
    VALID: 2,
    INVALID: 3,
  };

  const [hostStatus, setHostStatus] = useState(ServerStatusState.WAITING);
  const [potentialEndpoint, setPotentialEndpoint] = useState(null);
  const [potentialHost, setPotentialHost] = useState(null);

  const discoverServers = async () => {
    try {
      const raw_servers = await fetch(
        "http://localhost:3142/discovered-servers"
      );
      const servers = await raw_servers.json();
      if (servers) setEndpointList(servers);
    } catch (e) {
      console.error(e);
    }
  };

  const attemptManualConnection = async () => {
    // Check if both fields are filled
    if (!manualIp || !manualPort) {
      setDialogOpen(true); // Open the dialog if validation fails
      return;
    }

    setHostStatus(ServerStatusState.LOADING);
    const attemptedServerEndpoint = `http://${manualIp}:${manualPort}`;

    try {
      const resp = await fetch(`${attemptedServerEndpoint}/discover`);
      const host = await resp?.text();
      console.log(resp, host);

      if (resp && host) {
        setPotentialEndpoint(attemptedServerEndpoint);
        setPotentialHost(host);
        setHostStatus(ServerStatusState.VALID);
      } else {
        setHostStatus(ServerStatusState.INVALID);
      }
    } catch (e) {
      console.error(e);
      setHostStatus(ServerStatusState.INVALID);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const submitNewServer = () => {
    setEndpointList((prevList) => [
      ...prevList,
      [potentialEndpoint, potentialHost],
    ]);
    setHostStatus(ServerStatusState.WAITING);
  };

  const noSubmitNewServer = () => {
    setHostStatus(ServerStatusState.WAITING);
  };

  const renderServerState = () => {
    if (hostStatus === ServerStatusState.WAITING) {
      return;
    } else if (hostStatus === ServerStatusState.LOADING) {
      return (
        <div style={{ marginTop: "50px" }}>
          <CircularProgress />
        </div>
      );
    } else if (hostStatus === ServerStatusState.INVALID) {
      return (
        <div style={{ marginTop: "50px" }}>
          <Typography gutterBottom variant="h5">
            Unable to find endpoint with address {`${manualIp}:${manualPort}`}.
          </Typography>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "50px" }}>
          <Typography variant="h5">Server found!</Typography>
          <Typography variant="h5">
            Address: {`${manualIp}:${manualPort}`}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Name: "{potentialHost}"
          </Typography>
          <Typography gutterBottom variant="h5">
            Add to list of servers?
          </Typography>
          <Button
            onClick={noSubmitNewServer}
            variant="contained"
            color="error"
            sx={{ marginRight: "10px" }}
          >
            <CloseIcon />
          </Button>
          <Button
            onClick={submitNewServer}
            variant="contained"
            color="success"
            sx={{ marginLeft: "10px" }}
          >
            <CheckIcon />
          </Button>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        height: "100vh",
        padding: "20px",
        gap: "20px",
      }}
    >
      {/* Service Discovery (75%) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          textAlign: "center",
          alignItems: "center",
          borderRight: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <Button
          color="primary"
          // fullWidth
          variant="contained"
          sx={{
            width: "fit-content",
            marginBottom: "15px",
            padding: "20px", // Larger padding for bigger buttons
            fontSize: "1.25rem", // Increase font size
          }}
          onClick={discoverServers}
        >
          Discover Servers
        </Button>
        <Paper
          style={{
            margin: "20px",
            width: "70%",
            height: "75%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <List>
            {endpointList.map(([endpoint, owner], idx) => (
              <ListItem>
                <EndpointButton
                  key={`endpoint-button-${idx}`}
                  bindEndpoint={bindEndpoint}
                  endpoint={endpoint}
                  owner={owner}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>

      {/* Manual Entry (25%) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          textAlign: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            marginBottom: "15px",
            padding: "20px", // Larger padding for bigger buttons
            fontSize: "1.25rem", // Increase font size
          }}
          onClick={attemptManualConnection}
        >
          Connect Manually
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Enter Server IP"
              variant="outlined"
              value={manualIp}
              onChange={(e) => setManualIp(e.target.value)}
              fullWidth
              style={{ fontSize: "1.25rem" }} // Larger font size for input field
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Enter Port"
              variant="outlined"
              value={manualPort}
              onChange={(e) => setManualPort(e.target.value)}
              fullWidth
              style={{ fontSize: "1.25rem" }} // Larger font size for input field
            />
          </Grid>
        </Grid>
        {renderServerState()}
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Both IP address and port are required to connect to the server.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

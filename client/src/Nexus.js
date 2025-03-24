import React, { useState } from "react";
import Gateway from "./Gateway/Gateway";
import Multicaster from "./ServiceDiscovery/Multicaster";
import { Button } from "@mui/material";

export default function Nexus({ userData }) {
  const [isDiscovering, setIsDiscovering] = useState(true);
  const [endpoint, setEndpoint] = useState(null);
  const [clientState, setClientState] = useState({});

  const bindEndpoint = (chosenEndpoint) => {
    setIsDiscovering(false);
    setEndpoint(chosenEndpoint);
  };

  const unbindEndpoint = () => {
    setIsDiscovering(true);
    setEndpoint(null);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isDiscovering ? (
        <Multicaster
          userData={userData}
          bindEndpoint={bindEndpoint}
          setClientState={setClientState}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div>
            <Button variant="contained" onClick={unbindEndpoint}>
              Return to Platform Select
            </Button>
          </div>
          <Gateway
            endpoint={endpoint}
            clientState={clientState}
            username={userData.username}
          />
        </div>
      )}
    </div>
  );
}

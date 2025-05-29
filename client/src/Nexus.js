import { useEffect, useState } from "react";
import Gateway from "./Gateway/Gateway";
import Multicaster from "./ServiceDiscovery/Multicaster";
import { Button } from "@mui/material";

export default function Nexus({ userData }) {
  const [isDiscovering, setIsDiscovering] = useState(true);
  const [endpointDetails, setEndpointDetails] = useState(null);

  useEffect(() => {
    const tryPrelaunchPlatform = () => {
      const endpointDetails = localStorage.getItem("endpointData");
      if (endpointDetails) {
        setEndpointDetails(JSON.parse(endpointDetails));
        setIsDiscovering(false);
      }
    };
    tryPrelaunchPlatform();
  }, []);

  const bindEndpoint = (chosenEndpoint) => {
    setIsDiscovering(false);
    localStorage.setItem("endpointData", JSON.stringify(chosenEndpoint));
    setEndpointDetails(chosenEndpoint);
  };

  const unbindEndpoint = () => {
    setIsDiscovering(true);
    localStorage.removeItem("endpointData");
    localStorage.removeItem("userData");
    setEndpointDetails(null);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isDiscovering ? (
        <Multicaster userData={userData} bindEndpoint={bindEndpoint} />
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
            endpoint={endpointDetails.endpoint}
            clientState={endpointDetails.clientState}
            username={userData.username}
          />
        </div>
      )}
    </div>
  );
}

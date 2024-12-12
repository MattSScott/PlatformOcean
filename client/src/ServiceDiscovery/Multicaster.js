import React, { useState } from "react";
import { Button } from "@mui/material";
import EndpointButton from "./EndpointButton";

export default function Multicaster({ bindEndpoint }) {
  const [endpointList, setEndpointList] = useState([]);

  const fetchPluginDetails = async () => {
    try {
      const raw_servers = await fetch(
        "http://localhost:3142/discovered-servers"
      );
      const servers = await raw_servers.json();
      console.log(servers);
      if (servers) setEndpointList(servers);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button variant="contained" color="success" onClick={fetchPluginDetails}>
        Discover Servers
      </Button>
      {endpointList.map(([endpoint, owner], idx) => (
        <EndpointButton
          key={`endpoint-button-${idx}`}
          bindEndpoint={bindEndpoint}
          endpoint={endpoint}
          owner={owner}
        />
      ))}
    </div>
  );
}

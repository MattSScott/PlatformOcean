import React from "react";

const ServerAddressContext = React.createContext({
  add: "http://localhost:8080",
  setAdd: () => {},
});

export default ServerAddressContext;

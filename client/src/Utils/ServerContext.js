import React from "react";

const ServerAddressContext = React.createContext({
  add: "http://localhost:2000",
  setAdd: () => {},
});

export default ServerAddressContext;

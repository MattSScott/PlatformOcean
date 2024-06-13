import { createContext, useContext } from "react";

export const NetworkIPContext = createContext(null);

export const useNetworkIPContext = () => {
  return useContext(NetworkIPContext);
};

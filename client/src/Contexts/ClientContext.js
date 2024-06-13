import { createContext, useContext } from "react";

// export const ClientContext = createContext(null);
// export const ClientIDContext = createContext(null);

export const ClientDataContext = createContext();

export const useClientDataContext = () => {
  return useContext(ClientDataContext);
};

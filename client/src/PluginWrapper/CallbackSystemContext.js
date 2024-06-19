import React, { createContext, useContext, useState } from "react";

const CallbackContext = createContext({});

export const useCallbackContext = () => {
  return useContext(CallbackContext);
};

export const CallbackProvider = ({ children }) => {
  const [callbacks, setCallbacks] = useState({
    handleCreateMessage: () => {},
    handleUpdateMessage: () => {},
    handleDeleteMessage: () => {},
  });

  const updateCallbacks = (newCallbacks) => {
    setCallbacks((prev) => ({ ...prev, ...newCallbacks }));
  };

  return (
    <CallbackContext.Provider value={{ callbacks, updateCallbacks }}>
      {children}
    </CallbackContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";

// Create a context for the callback functions
const CallbackContext = createContext();

export const useCallbackContext = () => {
  return useContext(CallbackContext);
};

export const CallbackProvider = ({ children }) => {
  const [callbacks, setCallbacks] = useState({
    handleCreateMessage: null,
    handleUpdateMessage: null,
    handleDeleteMessage: null,
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

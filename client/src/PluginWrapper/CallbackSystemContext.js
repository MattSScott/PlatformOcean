import React, {
  createContext,
  useContext,
  useRef,
  //   useState,
  //   useCallback,
} from "react";

const CallbackContext = createContext({});

export const useCallbackContext = () => {
  return useContext(CallbackContext);
};

export const CallbackProvider = ({ children }) => {
  const callbacksRef = useRef({
    handleCreateMessage: () => {},
    handleUpdateMessage: () => {},
    handleDeleteMessage: () => {},
  });

  const updateCallbacks = (newCallbacks) => {
    callbacksRef.current = {
      ...callbacksRef.current,
      ...newCallbacks,
    };
  };

  console.log(callbacksRef.current.handleCreateMessage);

  return (
    <CallbackContext.Provider
      value={{ callbacks: callbacksRef.current, updateCallbacks }}
    >
      {children}
    </CallbackContext.Provider>
  );
};

// export const CallbackProvider = ({ children }) => {
//   const [callbacks, setCallbacks] = useState({
//     handleCreateMessage: () => {},
//     handleUpdateMessage: () => {},
//     handleDeleteMessage: () => {},
//   });

//   //   const updateCallbacks = (newCallbacks) => {
//   //     setCallbacks((prevCallbacks) => ({ ...prevCallbacks, ...newCallbacks }));
//   //   };

//   const updateCallbacks = useCallback((newCallbacks) => {
//     setCallbacks((prevCallbacks) => ({
//       ...prevCallbacks,
//       ...newCallbacks,
//     }));
//   }, []);

//   return (
//     <CallbackContext.Provider value={{ callbacks, updateCallbacks }}>
//       {children}
//     </CallbackContext.Provider>
//   );
// };

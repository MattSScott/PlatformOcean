import React, { useState, useCallback } from "react";
import "./App.css";
import StyledHeader from "./StyledHeader";
import Nexus from "./Nexus";
import Registration from "./Registration/Registration";
import Deregistration from "./Registration/Deregistration";

function App() {
  const [userIsBound, setUserIsBound] = useState(false);
  const [userDetailsObject, setUserDetailsObject] = useState(null);

  const setUserDetails = useCallback((userData) => {
    setUserIsBound(true);
    setUserDetailsObject(userData);
  }, []);

  const unsetUserDetails = () => {
    setUserIsBound(false);
    setUserDetailsObject(null);
  };

  console.log(userDetailsObject);

  return (
    <div className="App">
      <div
        style={{
          margin: "20px",
          height: "10%",
          width: "100%",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <StyledHeader />
        {userIsBound && <Deregistration unsetUserDetails={unsetUserDetails} />}
      </div>
      <header className="App-header">
        {userIsBound ? (
          <Nexus userData={userDetailsObject} />
        ) : (
          <Registration setUserDetails={setUserDetails} />
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import StyledHeader from "./StyledHeader";
import Nexus from "./Nexus";
import Registration from "./Registration/Registration";
import Deregistration from "./Registration/Deregistration";

function App() {
  const [userIsBound, setUserIsBound] = useState(false);
  const [userDetailsObject, setUserDetailsObject] = useState(null);

  const setUserDetails = (userData) => {
    setUserIsBound(true);
    setUserDetailsObject(userData);
  };

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
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledHeader />
        {userIsBound && <Deregistration unsetUserDetails={unsetUserDetails} />}
      </div>
      <header className="App-header">
        {userIsBound ? (
          <Nexus />
        ) : (
          <Registration setUserDetails={setUserDetails} />
        )}
      </header>
    </div>
  );
}

export default App;

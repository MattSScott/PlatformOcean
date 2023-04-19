import Registration from "../Registration/Registration";
import React, { useState } from "react";
import Gateway from "../Gateway/Gateway";

export default function SignupRouter() {
  const [clientInfo, setClientInfo] = useState(null);

  return (
    <div>
      {clientInfo ? (
        <Gateway clientID={clientInfo.clientID} />
      ) : (
        <Registration setClientInfo={setClientInfo} />
      )}
    </div>
  );
}

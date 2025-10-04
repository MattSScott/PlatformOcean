// import React, { useEffect, useState } from "react";
import { useClientDataContext } from "../Contexts/ClientContext";
import useIntraSubscription from "./UseIntraSubscription";
import useInterSubscription from "./UseInterSubscription";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin({ routingKey, depKey }) {
    const { clientID, username } = useClientDataContext();
    const intraOperators = useIntraSubscription(routingKey);
    const { canSubscribe, ...interOperators } = useInterSubscription(
      routingKey,
      depKey
    );

    return canSubscribe ? (
      <WrappedComponent
        intraOperators={intraOperators}
        interOperators={interOperators}
        user={clientID}
        nickname={username}
      />
    ) : (
      <h2>Waiting for dependencies to mount... 🐛</h2>
    );
  }
  return WrappedPlugin;
}

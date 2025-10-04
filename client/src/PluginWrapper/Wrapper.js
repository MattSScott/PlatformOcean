// import React, { useEffect, useState } from "react";
import { useClientDataContext } from "../Contexts/ClientContext";
import useIntraSubscription from "./UseIntraSubscription";
import useInterSubscription from "./UseInterSubscription";

export default function PluginWrapper(WrappedComponent) {
  function WrappedPlugin({ routingKey, subscriptions = [] }) {
    if (subscriptions.length > 1) {
      throw new Error("Plugins support  at most one inter subscription");
    }
    const { clientID, username } = useClientDataContext();
    const intraOperators = useIntraSubscription(routingKey);
    const { canSubscribe, ...interOperators } = useInterSubscription(
      routingKey,
      subscriptions[0] || null
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

import React from "react";
import { useState, useEffect } from "react";
import { loadComponent } from "./loadComponent";

const componentCache = new Map();

export const ConsultPluginCache = (remoteUrl, scope, module, sandbox) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (!sandbox) {
      return;
    }

    if (componentCache.has(key)) {
      console.log("SKIPPING!");
      setComponent(componentCache.get(key));
    } else {
      console.log("LOADING!");
      const Comp = React.lazy(loadComponent(remoteUrl, scope, module, sandbox));
      componentCache.set(Comp);
      setComponent(Comp);
    }
  }, [key, remoteUrl, scope, module, sandbox]);

  return Component;
};

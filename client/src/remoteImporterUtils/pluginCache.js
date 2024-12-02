import React from "react";
import { useState, useEffect } from "react";
import { loadComponent } from "./loadComponent";

const componentCache = new Map();

export const ConsultPluginCache = (remoteUrl, scope, module) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState({
    RemoteComponent: null,
    moduleFrame: null,
  });

  useEffect(() => {
    if (componentCache.has(key)) {
      console.log("SKIPPING!");
      setComponent(componentCache.get(key));
    } else {
      console.log("LOADING!");
      var moduleFrame = null;
      const RemoteComponent = React.lazy(async () => {
        const { Module, iframe } = await loadComponent(
          remoteUrl,
          scope,
          module
        );
        console.log(Module, iframe);
        moduleFrame = iframe;
        return Module;
      });
      const ComponentIFramePair = { RemoteComponent, moduleFrame };
      componentCache.set(key, ComponentIFramePair);
      setComponent(ComponentIFramePair);
    }
  }, [key, remoteUrl, scope, module]);

  return Component;
};

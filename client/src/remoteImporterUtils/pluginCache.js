import React from "react";
import { useState, useEffect } from "react";
import { loadComponent } from "./loadComponent";
// import { importRemote } from "module-federation-import-remote";

const componentCache = new Map();

export const consultPluginCache = (remoteUrl, scope, module) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState(null);

  //   console.log(componentCache);

  useEffect(() => {
    if (componentCache.has(key)) {
      // if (false) {
      console.log("SKIPPING!");
      setComponent(componentCache.get(key));
    } else {
      console.log("LOADING!");
      const Comp = React.lazy(loadComponent(remoteUrl, scope, module));
      // const Comp = React.lazy(() =>
      //   importRemote({
      //     url: remoteUrl,
      //     scope: scope,
      //     module: module,
      //     bustRemoteEntryCache: true,
      //   })
      // );
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
  }, []);

  return { Component };

  //   console.log(componentCache);

  //   useEffect(() => {
  //     if (componentCache.has(key)) {
  //       console.log("SETTING!");
  //       setComponent(componentCache.get(key));
  //     } else if (Component) {
  //       setComponent(null);
  //     }
  //     // Only recalculate when key changes
  //   }, [key]);

  //   useEffect(() => {
  //     if (!Component) {
  //       console.log("SETTING?");
  //       const Comp = React.lazy(
  //         loadComponent(remoteName, remoteUrl, moduleName, scope)
  //       );
  //       componentCache.set(key, Comp);
  //       setComponent(Comp);
  //     }
  //     // key includes all dependencies (scope/module)
  //   }, [Component, key]);

  //   return { Component };
};

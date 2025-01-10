import React from "react";
import { useState, useEffect } from "react";
import { loadComponent } from "./loadComponent";

const componentCache = new Map();

export const ConsultPluginCache = (remoteUrl, scope, module, sandbox) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [state, setState] = useState({
    component: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!sandbox) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      return;
    }

    if (componentCache.has(key)) {
      const CachedComp = componentCache.get(key);
      setState({
        component: CachedComp,
        isLoading: false,
        error: null,
      });
      return;
    }

    try {
      const DynamicComponent = React.lazy(
        loadComponent(remoteUrl, scope, module, sandbox)
      );
      componentCache.set(DynamicComponent);
      setState({
        component: DynamicComponent,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.log(err);
      setState({
        component: null,
        isLoading: false,
        error: err,
      });
    }
  }, [key, remoteUrl, scope, module, sandbox]);

  return state;
};

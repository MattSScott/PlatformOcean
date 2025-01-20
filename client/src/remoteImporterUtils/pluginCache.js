import React from "react";
import { useState, useEffect } from "react";
import { loadComponent } from "./loadComponent";

const componentCache = new Map();

export const ConsultPluginCache = (pluginName, scope, module, sandbox) => {
  const [state, setState] = useState({
    component: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const key = `${pluginName}-${scope}-${module}`;

    if (!sandbox || !sandbox.contentDocument) {
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
        loadComponent(pluginName, scope, module, sandbox)
      );
      // componentCache.set(key, DynamicComponent);

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
  }, [pluginName, scope, module, sandbox]);

  return state;
};

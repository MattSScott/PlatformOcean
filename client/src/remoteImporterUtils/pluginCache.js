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
    console.log(key, componentCache.has(key));

    if (!sandbox?.contentDocument) {
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

    const attemptLoad = async () => {
      try {
        const DynamicModule = await loadComponent(
          pluginName,
          scope,
          module,
          sandbox
        );

        const DynamicComponent = DynamicModule.default;

        setState({
          component: DynamicComponent,
          isLoading: false,
          error: null,
        });

        componentCache.set(key, DynamicComponent);
      } catch (err) {
        console.log(err);
        setState({
          component: null,
          isLoading: false,
          error: err,
        });
      }
    };

    attemptLoad();
  }, [pluginName, scope, module, sandbox]);

  return state;
};

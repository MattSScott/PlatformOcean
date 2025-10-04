import { useState, createContext, useContext, useEffect } from "react";

const PluginRegistryContext = createContext();

export function PluginRegistryProvider({ platformHash, children }) {
  const [readyPlugins, setReadyPlugins] = useState(new Set());
  const [dependencyLookup, setDependencyLookup] = useState({});

  console.log(platformHash);

  useEffect(() => {
    const reformedHash = {};
    platformHash.forEach(({ pluginKey, subscriptions }) => {
      reformedHash[pluginKey] = subscriptions || [];
    });

    setDependencyLookup(reformedHash);
    // console.log(reformedHash);
  }, [platformHash]);

  const markReady = (pluginKey) => {
    setReadyPlugins((prev) => {
      if (prev.has(pluginKey)) return prev;
      const next = new Set(prev);
      next.add(pluginKey);
      return next;
    });
  };

  const areSubsReady = (pluginKey) => {
    const deps = dependencyLookup[pluginKey] || [];
    return deps.every((dep) => readyPlugins.has(dep));
  };

  return (
    <PluginRegistryContext.Provider
      value={{
        pluginReadyCount: readyPlugins.size,
        markReady,
        areSubsReady,
      }}
    >
      {children}
    </PluginRegistryContext.Provider>
  );
}

export const usePluginRegistry = () => useContext(PluginRegistryContext);

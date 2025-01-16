import React, { useEffect, useState } from "react";
import RemotePluginPipeline from "./RemotePluginPipeline";

export default function PluginImporter(pluginDescriptors) {
  const [pluginKeyPairs, setpluginKeyPairs] = useState({});

  useEffect(() => {
    const addToDict = (dict, key, val) => {
      if (key in dict) {
        dict[key].push(val);
      } else {
        dict[key] = [val];
      }
    };

    const outputDict = {};

    for (const { pluginKey, pluginName } of pluginDescriptors) {
      const FetchedPlugin = (
        <RemotePluginPipeline
          pluginName={pluginName}
          scope={"PLUGIN"}
          module={"./Plugin"}
          pluginKey={pluginKey}
        />
      );
      addToDict(outputDict, pluginName, FetchedPlugin);
    }
    setpluginKeyPairs(outputDict);
  }, [pluginDescriptors]);

  return pluginKeyPairs;
}

import React, { useEffect, useState } from "react";
import RemotePluginPipeline from "./RemotePluginPipeline";
import { WithPluginControls } from "../PluginAdder/WithPluginControls";

export default function PluginImporter(pluginDescriptors) {
  const [pluginKeyPairs, setpluginKeyPairs] = useState({});

  console.log(pluginDescriptors);

  useEffect(() => {
    const addToDict = (dict, key, val) => {
      if (key in dict) {
        dict[key].push(val);
      } else {
        dict[key] = [val];
      }
    };

    const outputDict = {};

    for (const { pluginKey, pluginName, subscriptions } of pluginDescriptors) {
      const PeristentRemotePlugin = React.memo(RemotePluginPipeline);
      const DeletablePlugin = WithPluginControls(PeristentRemotePlugin);
      const FetchedPlugin = (
        <DeletablePlugin
          pluginName={pluginName}
          scope={"PLUGIN"}
          module={"./Plugin"}
          pluginKey={pluginKey}
          subscriptions={subscriptions}
        />
      );
      addToDict(outputDict, pluginName, FetchedPlugin);
    }
    setpluginKeyPairs(outputDict);
  }, [pluginDescriptors]);

  return pluginKeyPairs;
}

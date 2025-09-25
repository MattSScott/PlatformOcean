import React, { useEffect, useState } from "react";
import RemotePluginPipeline from "./RemotePluginPipeline";
import { WithDeleteButton } from "../PluginAdder/WithDeleteButton";

function topologicalSort(descriptors) {
  console.log(descriptors);
  return;

  const graph = new Map();
  const inDegree = new Map();
  const result = [];

  descriptors.forEach((d) => {
    graph.set(d.instanceId, []);
    inDegree.set(d.instanceId, 0);
  });

  descriptors.forEach((d) => {
    (d.subscriptions || []).forEach((dep) => {
      if (!graph.has(dep)) return; // ignore missing
      graph.get(dep).push(d.instanceId);
      inDegree.set(d.instanceId, (inDegree.get(d.instanceId) || 0) + 1);
    });
  });

  // Kahn's algorithm
  const queue = [];
  inDegree.forEach((deg, key) => {
    if (deg === 0) queue.push(key);
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    result.push(curr);
    (graph.get(curr) || []).forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    });
  }

  return result.map((id) => descriptors.find((d) => d.instanceId === id));
}

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

    topologicalSort(pluginDescriptors);

    const outputDict = {};

    for (const { pluginKey, pluginName } of pluginDescriptors) {
      const PeristentRemotePlugin = React.memo(RemotePluginPipeline);
      const DeletablePlugin = WithDeleteButton(PeristentRemotePlugin);
      const FetchedPlugin = (
        <DeletablePlugin
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

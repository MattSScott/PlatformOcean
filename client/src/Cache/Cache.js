import { useState, useEffect } from "react";
import NullView from "../NullView/NullView";

export default function Cache(ChildComponent) {
  const [plugs, addPlugs] = useState({});

  useEffect(() => {
    window.registerPlugin = updatePlugins;
  }, []);

  const updatePlugins = (name, plugin) => {
    addPlugs((prevPlugs) => ({ ...prevPlugs, [name]: plugin }));
  };

  const getPlugs = (name) => {
    if (name in plugs) {
      return plugs[name];
    }
    return <NullView />;
  };

  return <ChildComponent getPlugs={getPlugs} setCache={updatePlugins} />;
}

import { ConsultPluginCache } from "../remoteImporterUtils/pluginCache";
import PluginWrapper from "../PluginWrapper/Wrapper";
import FetchingPlugin from "../PluginWrapper/FetchingPlugin";

export default function SandboxStateController(...args) {
  const { component, isLoading, error } = ConsultPluginCache(...args);

  if (isLoading) {
    return FetchingPlugin;
  }

  if (error) {
    return <p>Failed to import plugin 🙀</p>;
  }

  return PluginWrapper(component);
}

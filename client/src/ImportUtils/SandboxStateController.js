import { ConsultPluginCache } from "../remoteImporterUtils/pluginCache";
import PluginWrapper from "../PluginWrapper/Wrapper";
import FetchingPlugin from "../PluginWrapper/FetchingPlugin";

export default function SandboxStateController(...args) {
  const { component, isLoading, error } = ConsultPluginCache(...args);

  if (isLoading) {
    return FetchingPlugin;
  }

  // console.log(component, isLoading, error);

  // window.err = error;

  if (error) {
    return () => (
      <div>
        <h2>Failed to import plugin 🙀</h2>
        <p>{error.toString()}</p>
      </div>
    );
  }

  return PluginWrapper(component);
}

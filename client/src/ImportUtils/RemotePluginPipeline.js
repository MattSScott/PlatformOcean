import React from "react";
import { useClientDataContext } from "../Contexts/ClientContext";
import { ConsultPluginCache } from "../remoteImporterUtils/pluginCache";
import PluginWrapper from "../PluginWrapper/Wrapper";
import ErrorBoundary from "../remoteImporterUtils/errorBoundary";

export default function RemotePluginPipeline({
  remoteUrl,
  scope,
  module,
  pluginKey,
  ...props
}) {
  // get remote component from url
  const RemoteComponent = ConsultPluginCache(remoteUrl, scope, module);
  // inject dist. functionality
  const DistributedRemoteComponent = PluginWrapper(RemoteComponent);
  // hook in client data
  const { client, clientID } = useClientDataContext();

  return (
    <ErrorBoundary>
      <DistributedRemoteComponent
        {...props}
        routingKey={pluginKey}
        client={client}
        uniqueClientID={clientID}
      />
    </ErrorBoundary>
  );
}

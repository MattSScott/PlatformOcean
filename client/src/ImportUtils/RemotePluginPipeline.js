import React from "react";
import { ConsultPluginCache } from "../remoteImporterUtils/pluginCache";
import PluginWrapper from "../PluginWrapper/Wrapper";
import ErrorBoundary from "../remoteImporterUtils/errorBoundary";
import { ClientContext, ClientIDContext } from "../Contexts/ClientContext";

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

  return (
    <ErrorBoundary>
      <React.Suspense>
        <ClientContext.Consumer key={pluginKey}>
          {(client) => (
            <ClientIDContext.Consumer>
              {(clientID) => (
                <DistributedRemoteComponent
                  {...props}
                  routingKey={pluginKey}
                  client={client}
                  uniqueClientID={clientID}
                />
              )}
            </ClientIDContext.Consumer>
          )}
        </ClientContext.Consumer>
      </React.Suspense>
    </ErrorBoundary>
  );
}

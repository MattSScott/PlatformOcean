import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useClientDataContext } from "../Contexts/ClientContext";
import { ConsultPluginCache } from "../remoteImporterUtils/pluginCache";
import PluginWrapper from "../PluginWrapper/Wrapper";
import ErrorBoundary from "../remoteImporterUtils/errorBoundary";
import FetchingPlugin from "../PluginWrapper/FetchingPlugin";

export default function RemotePluginPipeline({
  remoteUrl,
  scope,
  module,
  pluginKey,
  ...props
}) {
  const [sandboxRef, setSandboxRef] = useState(null);
  const mountNode = sandboxRef?.contentWindow?.document?.body;

  const RemoteComponent = ConsultPluginCache(
    remoteUrl,
    scope,
    module,
    sandboxRef
  );

  // inject dist. functionality
  const DistributedRemoteComponent = PluginWrapper(RemoteComponent);
  // hook in client data
  const { client, clientID } = useClientDataContext();

  return (
    <ErrorBoundary>
      <iframe
        ref={setSandboxRef}
        style={{ width: "100%", height: "100%" }}
        title={`iframe-${pluginKey}`}
      >
        <React.Suspense fallback={<FetchingPlugin />}>
          {mountNode &&
            RemoteComponent &&
            createPortal(
              <DistributedRemoteComponent
                {...props}
                routingKey={pluginKey}
                client={client}
                uniqueClientID={clientID}
              />,
              mountNode
            )}
        </React.Suspense>
      </iframe>
    </ErrorBoundary>
  );
}

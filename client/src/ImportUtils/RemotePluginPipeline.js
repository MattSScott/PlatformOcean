import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useClientDataContext } from "../Contexts/ClientContext";
import { ConsultPluginCache } from "../remoteImporterUtils/pluginCache";
import PluginWrapper from "../PluginWrapper/Wrapper";
import ErrorBoundary from "../remoteImporterUtils/errorBoundary";
import FetchingPlugin from "../PluginWrapper/FetchingPlugin";
import GeneratingSandbox from "./GeneratingSandbox";

export default function RemotePluginPipeline({
  remoteUrl,
  scope,
  module,
  pluginKey,
  ...props
}) {
  // hook in client data
  const { client, clientID } = useClientDataContext();
  const [sandboxRef, setSandboxRef] = useState(null);
  const mountNode = sandboxRef?.contentWindow?.document?.body;

  const RemoteComponent = ConsultPluginCache(
    remoteUrl,
    scope,
    module,
    sandboxRef
  );

  // inject dist. functionality
  const DistributedRemoteComponent = RemoteComponent
    ? PluginWrapper(RemoteComponent)
    : null;

  return (
    <ErrorBoundary>
      <iframe
        ref={setSandboxRef}
        style={{
          width: "100%",
          height: "100%",
          display: sandboxRef ? "inline" : "none",
        }}
        title={`iframe-${pluginKey}`}
      />
      {DistributedRemoteComponent && mountNode ? (
        createPortal(
          <React.Suspense fallback={<FetchingPlugin />}>
            <DistributedRemoteComponent
              {...props}
              routingKey={pluginKey}
              client={client}
              uniqueClientID={clientID}
            />
          </React.Suspense>,
          mountNode
        )
      ) : (
        <GeneratingSandbox />
      )}
    </ErrorBoundary>
  );
}

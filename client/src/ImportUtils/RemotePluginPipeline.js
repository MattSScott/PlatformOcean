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

  const Sandbox = (
    <iframe
      ref={setSandboxRef}
      style={{
        width: "100%",
        height: "100%",
        display: sandboxRef ? "inline" : "none",
      }}
      title={`iframe-${pluginKey}`}
    />
  );

  if (!(RemoteComponent && mountNode)) {
    return (
      <>
        <FetchingPlugin />
        {Sandbox}
      </>
    );
  }

  // inject dist. functionality
  const DistributedRemoteComponent = PluginWrapper(RemoteComponent);

  return (
    <ErrorBoundary>
      {Sandbox}
      {createPortal(
        <DistributedRemoteComponent
          {...props}
          routingKey={pluginKey}
          client={client}
          uniqueClientID={clientID}
        />,
        mountNode
      )}
    </ErrorBoundary>
  );
}

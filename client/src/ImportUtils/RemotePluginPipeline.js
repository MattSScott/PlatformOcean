import React, { useState } from "react";
import { createPortal } from "react-dom";
import ErrorBoundary from "../remoteImporterUtils/errorBoundary";
import SandboxStateController from "./SandboxStateController";
import GeneratingSandbox from "./GeneratingSandbox";

export default function RemotePluginPipeline({
  remoteUrl,
  scope,
  module,
  pluginKey,
  ...props
}) {
  // hook in client data
  const [sandboxRef, setSandboxRef] = useState(null);
  const mountNode = sandboxRef?.contentWindow?.document?.body;

  const DistributedRemoteComponent = SandboxStateController(
    remoteUrl,
    scope,
    module,
    sandboxRef
  );

  return (
    <ErrorBoundary>
      <iframe
        ref={setSandboxRef}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          display: mountNode ? "inline" : "none",
        }}
        title={`iframe-${pluginKey}`}
      />
      {mountNode ? (
        createPortal(
          <DistributedRemoteComponent {...props} routingKey={pluginKey} />,
          mountNode
        )
      ) : (
        <GeneratingSandbox />
      )}
    </ErrorBoundary>
  );
}

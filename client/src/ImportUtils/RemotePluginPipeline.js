import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ErrorBoundary from "../remoteImporterUtils/errorBoundary";
import SandboxStateController from "./SandboxStateController";
import GeneratingSandbox from "./GeneratingSandbox";

export default function RemotePluginPipeline({
  pluginName,
  scope,
  module,
  pluginKey,
  ...props
}) {
  const [sandboxRef, setSandboxRef] = useState(null);

  const DistributedRemoteComponent = SandboxStateController(
    pluginName,
    scope,
    module,
    sandboxRef
  );

  const mountNode = sandboxRef?.contentWindow?.document?.body;

  return (
    <>
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
    </>
  );
}

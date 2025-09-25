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
  // const sandboxRef = useRef(null);
  // const [isSandboxReady, setIsSandboxReady] = useState(false);

  // const sandboxCurrent = sandboxRef.current;

  // useEffect(() => {
  //   const handleIframeLoad = () => {
  //     if (sandboxCurrent && sandboxCurrent.contentDocument) {
  //       setIsSandboxReady(true);
  //     }
  //   };
  //   handleIframeLoad();
  // }, [sandboxCurrent]);

  const [sandboxRef, setSandboxRef] = useState(null);

  const DistributedRemoteComponent = SandboxStateController(
    pluginName,
    scope,
    module,
    // sandboxCurrent
    sandboxRef
  );

  // const mountNode = sandboxCurrent?.contentDocument?.body;
  const mountNode = sandboxRef?.contentWindow?.document?.body;

  // console.log(mountNode);

  return (
    <>
      <iframe
        ref={setSandboxRef}
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          // display: mountNode && isSandboxReady ? "inline" : "none",
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

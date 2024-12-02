import React, { useEffect, useState } from "react";
// import { Sandbox } from "./Sandbox";
import { createPortal } from "react-dom";
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
  const [sandboxRef, setSandboxRef] = useState(null);
  const mountNode = sandboxRef?.contentWindow?.document?.body;

  // if (!mountNode) {
  //   return <div>Me loading</div>;
  // }

  const RemoteComponent = ConsultPluginCache(
    remoteUrl,
    scope,
    module,
    sandboxRef
  );

  console.log(sandboxRef);

  // inject dist. functionality
  const DistributedRemoteComponent = PluginWrapper(RemoteComponent);
  // hook in client data
  const { client, clientID } = useClientDataContext();

  // render it here...
  return (
    // <Sandbox>
    <ErrorBoundary>
      <iframe ref={setSandboxRef} style={{ width: "100%", height: "100%" }}>
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
      </iframe>
    </ErrorBoundary>
    // </Sandbox>
  );
}

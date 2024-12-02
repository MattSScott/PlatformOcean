import React from "react";
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
  // get remote component from url
  const { RemoteComponent, moduleFrame } = ConsultPluginCache(
    remoteUrl,
    scope,
    module
  );
  console.log(RemoteComponent);

  // inject dist. functionality
  const DistributedRemoteComponent = PluginWrapper(RemoteComponent);
  // hook in client data
  const { client, clientID } = useClientDataContext();

  const RenderablePlugin =
    RemoteComponent &&
    moduleFrame &&
    createPortal(
      <DistributedRemoteComponent
        {...props}
        routingKey={pluginKey}
        client={client}
        uniqueClientID={clientID}
      />,
      moduleFrame.contentDocument.body
    );

  return (
    <ErrorBoundary>{RenderablePlugin && <RenderablePlugin />}</ErrorBoundary>
  );
}

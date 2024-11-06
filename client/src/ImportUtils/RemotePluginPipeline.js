import React from "react";
import { CallbackProvider } from "../PluginWrapper/CallbackSystemContext";
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
      {/* <CallbackProvider> */}
      <DistributedRemoteComponent
        {...props}
        routingKey={pluginKey}
        client={client}
        uniqueClientID={clientID}
      />
      {/* </CallbackProvider> */}
    </ErrorBoundary>
  );

  // return (
  //   <ErrorBoundary>
  //     <React.Suspense>
  //       <ClientContext.Consumer key={pluginKey}>
  //         {(client) => (
  //           <ClientIDContext.Consumer>
  //             {(clientID) => (
  //               <DistributedRemoteComponent
  //                 {...props}
  //                 routingKey={pluginKey}
  //                 client={client}
  //                 uniqueClientID={clientID}
  //               />
  //             )}
  //           </ClientIDContext.Consumer>
  //         )}
  //       </ClientContext.Consumer>
  //     </React.Suspense>
  //   </ErrorBoundary>
  // );
}

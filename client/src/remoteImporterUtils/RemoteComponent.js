import React from "react";
import ErrorBoundary from "./errorBoundary";
import { ConsultPluginCache } from "./pluginCache";

const RemoteComponent = ({
  remoteUrl,
  scope,
  module,
  fallback = null,
  ...props
}) => {
  const { Component } = ConsultPluginCache(remoteUrl, scope, module);
  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        {Component && <Component {...props} />}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default RemoteComponent;

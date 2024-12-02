import React from "react";
import { createPortal } from "react-dom";
import ErrorBoundary from "./errorBoundary";
import { ConsultPluginCache } from "./pluginCache";

console.log("I AM CALLED???");

const RemoteComponent = ({
  remoteUrl,
  scope,
  module,
  fallback = null,
  ...props
}) => {
  const { Component, iframe } = ConsultPluginCache(remoteUrl, scope, module);
  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        {Component &&
          iframe &&
          createPortal(<Component {...props} />, iframe.contentDocument.body)}
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default RemoteComponent;

import React, { useState } from "react";
import { createPortal } from "react-dom";

export const Sandbox = ({ children }) => {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe ref={setContentRef} style={{ width: "100%", height: "100%" }}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

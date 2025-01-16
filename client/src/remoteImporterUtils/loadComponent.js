import fetchRemote from "./fetchRemote";

export const loadComponent =
  (componentID, scope, module, sandbox) => async () => {
    const baseURL = process.env.REACT_APP_FILE_SERVER_ADDRESS;
    const remoteUrl = `${baseURL}/plugins/${componentID}/remoteEntry.js`;
    // eslint-disable-next-line no-undef
    await __webpack_init_sharing__("default");
    const container = await fetchRemote(remoteUrl, scope, sandbox);
    // eslint-disable-next-line no-undef
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };

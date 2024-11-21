import fetchRemote from "./fetchRemote";

export const loadComponent = (remoteUrl, scope, module) => async () => {
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__("default");
  const fetchedContainer = await fetchRemote(
    `${remoteUrl.replace(/\/$/, "")}/remoteEntry.js`,
    scope
  );
  // eslint-disable-next-line no-undef
  await fetchedContainer.init(__webpack_share_scopes__.default);
  const factory = await fetchedContainer.get(module);
  const Module = factory();
  return Module;
};

import fetchRemote from "./fetchRemote";

export const loadComponent = async (remoteUrl, scope, module) => {
  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__("default");
  const { container, iframe } = await fetchRemote(
    `${remoteUrl.replace(/\/$/, "")}/remoteEntry.js`,
    scope
  );
  console.log(container, iframe);
  // eslint-disable-next-line no-undef
  console.log("Shared scope:", __webpack_share_scopes__.default);
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const Module = factory();
  return { Module, iframe };
};

import fetchRemote from "./fetchRemote";

// async function loadModule(url) {
//   try {
//     return await import(/* webpackIgnore:true */ url);
//   } catch (e) {
//     console.error(e);
//   }
//   return null;
// }

export const loadComponent = (remoteUrl, scope, module) => async () => {
  await __webpack_init_sharing__("default");
  const fetchedContainer = await fetchRemote(
    `${remoteUrl.replace(/\/$/, "")}/remoteEntry.js`,
    scope
  );
  // const fetchedContainer = await loadModule(remoteUrl);
  // eslint-disable-next-line no-undef
  await fetchedContainer.init(__webpack_share_scopes__.default);
  const container = window[scope];
  const factory = await container.get(module);
  const Module = factory();
  return Module;
};

// export const loadComponent = (remoteUrl, scope, module) => {
//   return async () => {
//     // eslint-disable-next-line no-undef
//     await __webpack_init_sharing__("default");
//     const container = await loadModule(remoteUrl + "/remoteEntry.js");
//     console.log(container, container.default);
//     // eslint-disable-next-line no-undef
//     await container.init(__webpack_share_scopes__.default);
//     const factory = await container.get(module);
//     const Module = factory();
//     return Module;
//   };
// };

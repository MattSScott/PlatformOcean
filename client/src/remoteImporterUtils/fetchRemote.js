// const fetchRemote = (url, scope) =>
//   new Promise((resolve, reject) => {
//     // We define a script tag to use the browser for fetching the remoteEntry.js file
//     const script = document.createElement("script");
//     script.src = url;
//     script.onerror = (err) => {
//       console.error(err);
//       reject(new Error(`Failed to fetch remote: ${scope}`));
//     };
//     // When the script is loaded we need to resolve the promise back to Module Federation
//     script.onload = () => {
//       // console.log(window[scope], scope);
//       // The script is now loaded on window using the name defined within the remote
//       const proxy = {
//         get: (request) => window[scope].get(request),
//         init: (arg) => {
//           try {
//             return window[scope].init(arg);
//           } catch (e) {
//             console.error(e);
//             console.error(`Failed to initialize remote: ${scope}`);
//             reject(e);
//           }
//         },
//       };
//       resolve(proxy);
//     };
//     // Lastly we inject the script tag into the document's head to trigger the script load
//     document.head.appendChild(script);
//   });

// export default fetchRemote;

const fetchRemote = async (url, scope) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const someImport = await import(/* webpackIgnore:true */ url);

  console.log(someImport);

  return someImport;

  const scriptContent = await response.text();

  // console.log(scriptContent);

  // Create a unique sandbox for this remote
  const sandbox = {};
  const sandboxedFunction = new Function("window", scriptContent);

  // console.log(sandboxedFunction);

  // Execute the script in the sandbox
  sandboxedFunction(sandbox);

  console.log(window[scope], sandbox);

  const container = sandbox[scope];

  // Store the remote in the registry under a unique key
  if (!container) {
    throw new Error(`Remote scope "${scope}" not found in the sandbox`);
  }
  // Initialize the container with shared scope (if using shared modules)
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);

  return container;
};

export default fetchRemote;

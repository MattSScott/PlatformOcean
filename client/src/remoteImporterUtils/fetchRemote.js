const fetchRemote = (url, scope, sandbox) =>
  new Promise((resolve, reject) => {
    // We define a script tag to use the browser for fetching the remoteEntry.js file
    if (!sandbox || !sandbox.contentDocument) {
      reject(
        new Error(`Sandbox not yet loaded, unable to attach remote script`)
      );
    }
    const script = sandbox.contentDocument.createElement("script");
    script.src = url;
    script.onerror = (err) => {
      console.error(err);
      reject(new Error(`Failed to fetch remote: ${scope}`));
    };
    // When the script is loaded we need to resolve the promise back to Module Federation
    script.onload = () => {
      // The script is now loaded on window using the name defined within the remote
      const proxy = {
        get: (request) => sandbox?.contentWindow[scope].get(request),
        init: (arg) => {
          try {
            return sandbox?.contentWindow[scope].init(arg);
          } catch (e) {
            console.error(e);
            console.error(`Failed to initialize remote: ${scope}`);
            reject(e);
          }
        },
      };
      resolve(proxy);
    };
    // Lastly we inject the script tag into the document's head to trigger the script load
    sandbox?.contentDocument?.head.appendChild(script);
  });

export default fetchRemote;

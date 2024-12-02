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

// const transferIframeStyles = (iframe) => {
//   const iframeHead = iframe.contentDocument.head;
//   const parentHead = document.head;

//   // Watch for future style/link insertions using MutationObserver
//   const observer = new MutationObserver((mutations) => {
//     console.log("SOmethin?");

//     mutations.forEach((mutation) => {
//       mutation.addedNodes.forEach((node) => {
//         console.log("C??");
//         if (
//           node.tagName === "STYLE" ||
//           (node.tagName === "LINK" && node.rel === "stylesheet")
//         ) {
//           parentHead.appendChild(node.cloneNode(true));
//         }
//       });
//     });
//   });

//   observer.observe(iframeHead, { childList: true, subtree: true });
// };

// const copyStylesFromIframeToMain = (iframe) => {
//   // Use MutationObserver to listen for style injections into iframe
//   const observer = new MutationObserver(() => {
//     const iframeStyles = iframe.contentDocument.querySelectorAll(
//       'style, link[rel="stylesheet"]'
//     );
//     if (iframeStyles.length > 0) {
//       console.log("HASHUASJ");

//       iframeStyles.forEach((style) => {
//         document.head.appendChild(style.cloneNode(true)); // Clone the style elements to move them to the main document
//       });
//       observer.disconnect(); // Stop observing after styles are copied
//     }
//   });

//   observer.observe(iframe.contentDocument.head, { childList: true });
// };

const fetchRemote = async (url, scope) => {
  return new Promise((resolve, reject) => {
    // Create an iframe to isolate the remote context
    const iframe = document.createElement("iframe");
    iframe.style.display = "none"; // Hide the iframe
    iframe.sandbox.add("allow-scripts"); // Allows the iframe to run JavaScript
    iframe.sandbox.add("allow-same-origin"); // Allows
    document.head.appendChild(iframe);

    // console.log(iframe.contentDocument.head);

    // Load the remoteEntry.js script inside the iframe
    const script = iframe.contentDocument.createElement("script");
    script.src = url;

    script.onload = () => {
      console.log(iframe.contentDocument.head);
      console.log(iframe.contentDocument.head.querySelectorAll("*"));
      const container = iframe.contentWindow[scope];
      if (container && container.init && container.get) {
        // copyStylesFromIframeToMain(iframe);
        resolve({ container, iframe }); // Return the container with init/get methods
      } else {
        reject(new Error(`Failed to find container for url: ${url}`));
      }
    };

    script.onerror = () =>
      reject(new Error(`Failed to load remote script: ${url}`));
    // Call this function after the iframe has loaded
    iframe.contentDocument.head.appendChild(script);
  });
};

export default fetchRemote;

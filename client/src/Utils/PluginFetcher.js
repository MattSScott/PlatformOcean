export function fetchPlugin(pluginKey, pluginURL) {
  if (window[pluginKey]) {
    return;
  }

  console.log(pluginKey);

  window.registerPlugin = function (componentToRegister) {
    console.log(pluginKey);
    window[pluginKey] = componentToRegister;
  };

  const script = document.createElement("script");

  script.src = pluginURL;
  script.async = true;
  script.type = "module";

  document.body.appendChild(script);
}

// export default function PluginFetcher({ pluginURL, pluginKey }) {
//   useEffect(() => {
//     const Plug = React.lazy(() => {
//       import("http://192.168.0.24:8080/plugs/Subtitler/main.js");
//     });
//   }, []);

//   return;
// }

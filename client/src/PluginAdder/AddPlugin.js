import { useNetworkIPContext } from "../Contexts/ServerIPContext";

export default function AddPlugin(pluginName, subs) {
  const NetworkIP = useNetworkIPContext();
  const sendPluginPayload = async () => {
    const body = {
      pluginName: pluginName,
      subscriptions: subs,
    };

    // TODO: add checking for validity of send?

    const pluginEndpoint = `${NetworkIP}/plugins/add`;

    const response = await fetch(pluginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(response);
  };

  return sendPluginPayload;
}

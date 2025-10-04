export default async function addPlugin(networkIP, pluginName, subs) {
  const body = {
    pluginName: pluginName,
    subscriptions: subs,
  };

  console.log(body);

  // TODO: add checking for validity of send?

  const pluginEndpoint = `${networkIP}/plugins/add`;

  const response = await fetch(pluginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log(response);
}

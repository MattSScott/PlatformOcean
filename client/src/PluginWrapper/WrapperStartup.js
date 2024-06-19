export const subscribe = (messageHandler, props) => {
  const SubscriberRoutingAddress = `/topic/${props.routingKey}/receive`;

  try {
    const pluginSubscription = props.client.subscribe(
      SubscriberRoutingAddress,
      (resp) => {
        const deserialiseJSONHeaders = JSON.parse(resp.body);
        const deserialiseJSON = deserialiseJSONHeaders.body;

        const JSONsender = deserialiseJSON.sender;
        const JSONmessage = JSON.parse(deserialiseJSON.message);
        const JSONmessageID = deserialiseJSON.messageID;
        const MessageProtcol = deserialiseJSON.protocol;
        const ParsedDatagram = {
          sender: JSONsender,
          message: JSONmessage,
          messageID: JSONmessageID,
        };

        messageHandler(MessageProtcol, ParsedDatagram);
      },
      { id: `sub-${props.uniqueClientID}-${props.routingKey}` }
    );
    return pluginSubscription;
  } catch (error) {
    console.log(error);
  }
  return null;
};

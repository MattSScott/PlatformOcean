import { useState, useEffect } from "react";
import * as Stomp from "stompjs";
import SockJS from "sockjs-client";

export default function ClientGenerator(endpoint) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(`${endpoint}/PlatformOcean`); // handshake with endpoint
    const clientHelper = Stomp.over(socket);
    clientHelper.connect({}, () => setClient(clientHelper));
    // Cleanup on unmount
    return () => {
      clientHelper && clientHelper.disconnect();
    };
  }, [endpoint]);

  return client;
}

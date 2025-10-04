import { useState, useCallback, useEffect } from "react";
import { useNetworkIPContext } from "../Contexts/ServerIPContext";

export default function MessageProtcol(routingKey, enqueueMessage) {
  const [dataHistory, setDataHistory] = useState([]);
  const NetworkIP = useNetworkIPContext();

  useEffect(() => {
    if (!routingKey) return;
    const fetchHistory = async () => {
      try {
        const HistoryRoutingAddress = `${NetworkIP}/history/${routingKey}`;
        const RawFetchedHistory = await fetch(HistoryRoutingAddress);
        const ParsedHistory = await RawFetchedHistory.json();
        const RemappedHistory = ParsedHistory.map((el) => ({
          ...el,
          message: JSON.parse(el.message),
        }));
        setDataHistory(RemappedHistory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, [NetworkIP, routingKey]);

  const runMessageProtocol = useCallback(
    (message, protocol) => {
      const handleCreateMessage = (data) => {
        enqueueMessage(data);
        setDataHistory((hist) => [...hist, data]);
      };

      const handleUpdateMessage = (data) => {
        setDataHistory((hist) =>
          hist.map((entry) => {
            if (entry.messageID !== data.messageID) {
              return entry;
            }
            return data;
          })
        );
      };

      const handleDeleteMessage = (data) => {
        setDataHistory((hist) =>
          hist.filter((entry) => entry.messageID !== data.messageID)
        );
      };

      switch (protocol) {
        case "CREATE":
          handleCreateMessage(message);
          return;
        case "UPDATE":
          handleUpdateMessage(message);
          return;
        case "DELETE":
          handleDeleteMessage(message);
          return;
        default:
          return;
      }
    },
    [enqueueMessage]
  );

  return { dataHistory, runMessageProtocol };
}

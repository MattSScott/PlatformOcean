import { useState, useCallback } from "react";

export default function MessageProtcol() {
  const [data, setData] = useState(null);
  const [dataHistory, setDataHistory] = useState([]);

  const setInitialDataHistory = useCallback((initialHistory) => {
    setDataHistory(initialHistory);
  }, []);

  const runMessageProtocol = useCallback((message, protocol) => {
    const handleCreateMessage = (data) => {
      setData(data);
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
  }, []);

  return { data, dataHistory, setInitialDataHistory, runMessageProtocol };
}

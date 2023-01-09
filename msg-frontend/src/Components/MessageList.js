import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function MessageList() {
  const [messages, loadMessages] = useState([]);
  // const eventSource = new EventSource("http://localhost:8080/messages/send");

  async function fetchMessages() {
    try {
      const response = await fetch("http://localhost:8080/message");
      const messages = await response.json();
      loadMessages(messages);
    } catch (error) {
      console.log(error);
    }
  }

  // eventSource.onmessage = () => {
  //   fetchMessages();
  // };

  // eventSource.onerror = () => {
  //   eventSource.close();
  // };

  useEffect(() => {
    setTimeout(() => {
      fetchMessages();
    }, 2000);
  });

  const columns = [
    { field: "sender", headerName: "Sender", width: 130 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "timestamp", headerName: "Time", width: 300 },
  ];

  return (
    <div style={{ height: 400, width: "57%", marginBottom: "10px" }}>
      <DataGrid
        rows={messages}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import "./Subtitler.css";

export default function Subtitler({ sender, data, clientID }) {
  const [isHost, setHost] = useState(false);

  useEffect(() => {
    if (data && data.content) {
      if (data.content === "host" && data.sender !== clientID) {
        setHost(false);
      }
    }
  }, [data, clientID]);

  const sendHost = () => {
    const message = { content: "host", sender: clientID };
    sender(message, false);
    setHost(true);
  };

  return (
    <div className="subtitler">
      <div className="subtitleArea">
        <p>{data && data.content !== "host" && data}</p>
      </div>
      <div className="inputArea">
        {isHost ? (
          <form>
            <input
              onChange={(e) => {
                sender(e.target.value, false);
              }}
            />
          </form>
        ) : (
          <button className="subButton" onClick={sendHost}>
            Become Host
          </button>
        )}
      </div>
    </div>
  );
}

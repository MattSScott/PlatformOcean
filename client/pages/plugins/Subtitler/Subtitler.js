import { useEffect, useState } from "react";
import SubtitlerStyles from "./Subtitler.module.css";

export default function Subtitler({ sender, data, clientID }) {
  const [isHost, setHost] = useState(false);

  useEffect(() => {
    if (data && data.message) {
      if (data.message.content === "host" && data.sender !== clientID) {
        setHost(false);
      }
    }
  }, [data, clientID]);

  const sendHost = () => {
    const message = { content: "host" };
    sender(message, false);
    setHost(true);
  };

  return (
    <div className={SubtitlerStyles.subtitler}>
      <div className={SubtitlerStyles.subtitleArea}>
        <p>{data && data.message.content !== "host" && data.message}</p>
      </div>
      <div className={SubtitlerStyles.inputArea}>
        {isHost ? (
          <form>
            <input
              onChange={(e) => {
                sender(e.target.value, false);
              }}
            />
          </form>
        ) : (
          <button className={SubtitlerStyles.subButton} onClick={sendHost}>
            Become Host
          </button>
        )}
      </div>
    </div>
  );
}

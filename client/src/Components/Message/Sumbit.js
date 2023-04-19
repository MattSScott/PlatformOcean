import { useState } from "react";
import "./Submit.css";

export default function Submit({ sender }) {
  const [msgInfo, setMsgInfo] = useState({ sender: null, content: null });

  return (
    <div>
      <div className="formCont">
        <div className="subForm">
          <p>Name</p>
          <form className="formEl">
            <input
              type="text"
              onChange={(e) =>
                setMsgInfo({ ...msgInfo, sender: e.target.value })
              }
            />
          </form>
        </div>
        <div className="subForm">
          <p>Message</p>
          <form className="formEl">
            <input
              type="text"
              onChange={(e) =>
                setMsgInfo({ ...msgInfo, content: e.target.value })
              }
            />
          </form>
        </div>
      </div>
      <button onClick={() => sender(msgInfo)}>Submit</button>
    </div>
  );
}

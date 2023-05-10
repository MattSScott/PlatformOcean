import { useState } from "react";
import Styles from "./Submit.module.css";

export default function Submit({ sender }) {
  const [msgInfo, setMsgInfo] = useState({ sender: null, content: null });

  return (
    <div>
      <div className={Styles.formCont}>
        <div className={Styles.subForm}>
          <p>Name</p>
          <form className={Styles.formEl}>
            <input
              type="text"
              onChange={(e) =>
                setMsgInfo({ ...msgInfo, sender: e.target.value })
              }
            />
          </form>
        </div>
        <div className={Styles.subForm}>
          <p>Message</p>
          <form className={Styles.formEl}>
            <input
              type="text"
              onChange={(e) =>
                setMsgInfo({ ...msgInfo, content: e.target.value })
              }
            />
          </form>
        </div>
      </div>
      <button className={Styles.submitter} onClick={() => sender(msgInfo)}>
        Submit
      </button>
    </div>
  );
}

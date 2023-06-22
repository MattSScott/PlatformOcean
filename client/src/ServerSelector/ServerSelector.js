import { useContext, useState } from "react";
import ServerContext from "../Utils/ServerContext";
import "./ServerSelector.css";

export default function ServerSelector() {
  const context = useContext(ServerContext);

  const [IP, setIP] = useState(["000", "000", "000", "000"]);

  const updateIP = (idx, val) => {
    setIP((prev) => {
      return [...prev.slice(0, idx), val, ...prev.slice(idx + 1)];
    });
  };

  const setServer = () => {
    const ip = IP.join(".");
    const addr = `http://${ip}:8080`;
    context.setAdd(addr);
  };

  console.log(context.add);

  return (
    <div>
      <p>Enter Server Address:</p>
      <div className={"servDiv"}>
        <input
          onChange={(e) => updateIP(0, e.target.value)}
          inputMode="decimal"
          maxLength="3"
        ></input>
        <div>.</div>
        <input
          onChange={(e) => updateIP(1, e.target.value)}
          inputMode="decimal"
          maxLength="3"
        ></input>
        <div>.</div>
        <input
          onChange={(e) => updateIP(2, e.target.value)}
          inputMode="decimal"
          maxLength="3"
        ></input>
        <div>.</div>
        <input
          onChange={(e) => updateIP(3, e.target.value)}
          inputMode="decimal"
          maxLength="3"
        ></input>
      </div>
      <button onClick={setServer}>Connect to Server</button>
    </div>
  );
}

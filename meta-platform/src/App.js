import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Circles } from "./Components/Network/Network";

function App() {
  return (
    <div className="App">
      <div className="navCont">
      <Navbar logo={logo}/>
      </div>
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Circles/>
      </div>
    </div>
  );
}

export default App;

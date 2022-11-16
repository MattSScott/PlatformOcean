import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Network from "./Components/Network/Network";

function App() {
  return (
    <div className="App">
      <div className="navCont">
        <Navbar logo={logo} />
      </div>
      <div className="App-header">
        <Network />
      </div>
    </div>
  );
}

export default App;

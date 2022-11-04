import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <div className="navCont">
      <Navbar logo={logo}/>
      </div>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}

export default App;

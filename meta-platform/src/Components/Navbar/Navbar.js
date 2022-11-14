import "./Navbar.css";
import PO_Logo from "./../../po_logo.png";

export default function Navbar({ logo }) {
  return (
    <header className="navHead">
      <div className="logoCont">
        <img src={PO_Logo} alt="nav-logo"></img>
      </div>
      <nav className="navbar">
        <div className="navItem">
          <a href="/">HOME</a>
        </div>
        <div className="navItem">
          <a href="/plugins">PLUGINS</a>
        </div>
        <div className="navItem">
          <a href="/about">ABOUT</a>
        </div>
      </nav>
    </header>
  );
}

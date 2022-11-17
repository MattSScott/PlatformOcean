import "./Navbar.css";

export default function Navbar({ logo }) {
  return (
    <header className="navHead">
      <div className="logoCont">
        <img src={logo} alt="nav-logo" />
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

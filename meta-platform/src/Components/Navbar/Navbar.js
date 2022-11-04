import "./Navbar.css";

export default function Navbar({logo}) {
  return (
    <header className="navHead">
      <div className="logoCont">
        <img src={logo} alt="nav-logo"></img>
      </div>
      <nav className="navbar">
          <div className="navItem">Home</div>
          <div className="navItem">Plugins</div>
          <div className="navItem">About</div>
      </nav>
    </header>
  );
}

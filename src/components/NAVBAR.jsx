import "../styles/navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a href="#hero" className="logo">

          🌊 <span>TrackLess</span>
        </a>

        {/* Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#">Dashboard</a>
            </li>

            <li>
              <a href="#">Habits</a>
            </li>

            <li>
              <a href="#">Progress</a>
            </li>

            <li>
              <a href="#">AI Insights</a>
            </li>

            <li>
              <a href="#">Planner</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
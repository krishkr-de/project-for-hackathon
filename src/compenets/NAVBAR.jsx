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
              <a href="#hero">Dashboard</a>
            </li>

            <li>
              <a href="#habits">Habits</a>
            </li>

            <li>
              <a href="#progress">Progress</a>
            </li>

            <li>
              <a href="#reflection">AI Insights</a>
            </li>

            <li>
              <a href="#planner">Planner</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
import { useState } from "react";
import "../styles/login.css";

const Login = () => {
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("username", name.trim());

    alert(`Welcome, ${name}!`);
    
    // Later, when you add React Router, you can navigate here.
  };

  return (
    <div className="login-page">
      {/* Background Glow */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      <div className="login-container">
        <div className="logo">
          <span className="wave">🌊</span>
          <h1>TrackLess</h1>
        </div>

        <p className="tagline">
          Track less. <span>Achieve more.</span>
        </p>

        <div className="login-card">
          <h2>Welcome 👋</h2>

          <p>Start your habit journey by entering your name.</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">
              Continue →
            </button>
          </form>
        </div>

        <p className="footer-text">
          Small habits. Big transformations.
        </p>
      </div>
    </div>
  );
};

export default Login;
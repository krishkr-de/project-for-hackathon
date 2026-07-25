import { useState } from "react";
import { loginUser } from "../utils/localStorage";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); 
  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Please enter your name.");
      return;
    }

    // Login or create user
    const user = loginUser(trimmedName);

    console.log("Logged in user:", user);

    navigate("/home");

    // Later
    // navigate("/home");
  };

  return (
  <PageTransition>
      <div className="login-page">
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
  </PageTransition>
  );
};

export default Login;
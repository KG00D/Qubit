import React from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="brand">Qubit</div>
      <nav className="nav">
        <a href="/about">About</a>
      </nav>
      <button className="loginButton" onClick={handleLoginClick}>
        Sign In / Login
      </button>
    </div>
  );
};

const MainContent = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  return (
    <div className="main">
      <p>Discover Precision</p>
      <button className="loginButton" onClick={handleGetStartedClick}>
        Get Started
      </button>
    </div>
  );
};

const Splash = () => {
  return (
    <div className="container">
      <Header />
      <MainContent />
    </div>
  );
};

export default Splash;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      {/* <div className="brand">Qubit</div> */}
      <nav className="nav"></nav>
    </div>
  );
};

const MainContent = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="main">
      <p>Qubit</p>
      <button className="loginButton" onClick={handleGetStartedClick}>
        Get Started
      </button>
      <button className="loginButton" onClick={handleLoginClick}>
        Sign In / Login
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

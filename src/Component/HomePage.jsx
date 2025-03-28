import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/HomePage.css"; // Import the CSS file

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <p className="home-text">Login to detect phishing websites</p>
      <button onClick={() => navigate("/login")} className="home-button">
        Login
      </button>
    </div>
  );
};

export default HomePage;

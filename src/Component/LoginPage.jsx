import React, { useState } from "react";
import "../CSS/LoginPage.css"; // Import the new CSS file
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Navigate=useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    Navigate('/upload')
    console.log("Logging in with", username, password);
  };

  return (
    <div className="login-container">
      {/* <h1 className="login-title">Phishing Websites</h1>
      <h2 className="login-subtitle">DETECTION OF PHISHING WEBSITES</h2> */}

      <div className="login-box">
        <h3 className="login-heading">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>

    </div>
  );
};

export default LoginPage;

import React from "react";
import "../CSS/Header.css"; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <h2 className="header-title">
        DEPARTMENT OF INFORMATION TECHNOLOGY
      </h2>
      <h3 className="header-subtitle">
        NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL-575025
      </h3>
      <h4 className="header-course">
        Information Assurance and Security (IT352) Course Project
      </h4>
      <h1 className="header-project-title">Detection of Phishing Websites</h1>
      <p className="header-students">
        Carried out by <br />
        <span>Lakshit Sharma (221IT040)</span> 
        <span>Kedar Dhule (221IT023)</span>
      </p>
      <p className="header-session">During Academic Session January - April 2025</p>
    </header>
  );
};

export default Header;

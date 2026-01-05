import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#interests">Interests</a></li>
        <li><a href="#about">About Me</a></li>
        <li><a href="#contact">Contact Me</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

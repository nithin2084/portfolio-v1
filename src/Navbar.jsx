import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`hamburger-container ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="hamburger-line line-1"></div>
        <div className="hamburger-line line-2"></div>
        <div className="hamburger-line line-3"></div>
      </div>

      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <ul className="menu-items">
          <li><a href="#home" onClick={toggleMenu}><span className="dash">-</span> Home</a></li>
          <li><a href="#interests" onClick={toggleMenu}><span className="dash">-</span> Interests</a></li>
          <li><a href="#about" onClick={toggleMenu}><span className="dash">-</span> About Me</a></li>
          <li><a href="#contact" onClick={toggleMenu}><span className="dash">-</span> Contact Me</a></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
        document.querySelector('.navbar-title').style.display = 'none';
    };

    const closeMenu = () => {
        setMenuOpen(false);
        document.querySelector('.navbar-title').style.display = 'block';
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="logo.png" alt="Logo" className="navbar-logo" />
                <h1 className="navbar-title">Community Safety App</h1>
            </div>
            <div className="navbar-right">
                <button className="menu-button" onClick={toggleMenu}>
                    ☰
                </button>
                <div className='navv'>
                    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <div className="navbar-banner">
                            <button className="close-button" onClick={closeMenu}>×</button>
                            <h2>Community Safety App</h2>
                        </div>
                        <Link to="/" className="navbar-link" onClick={closeMenu}>HOME</Link>
                        <Link to="/map" className="navbar-link" onClick={closeMenu}>MAP</Link>
                        <Link to="/updates" className="navbar-link" onClick={closeMenu}>UPDATES</Link>
                        <Link to="/signin" className="navbar-link" onClick={closeMenu}>SIGN IN</Link>
                    </div>
                </div>
                <div className="navbar-links-desktop">
                    <Link to="/" className="navbar-link-desktop">HOME</Link>
                    <Link to="/map" className="navbar-link-desktop">MAP</Link>
                    <Link to="/updates" className="navbar-link-desktop">UPDATES</Link>
                    <Link to="/signin" className="navbar-link-desktop">SIGN IN</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

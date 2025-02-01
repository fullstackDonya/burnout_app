import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Logout/logout"; 
import "./Navbar.css"; 

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        {/* <img src="/logo.svg" alt="Logo" /> */}
        <h3>RebootMind</h3>
      </div>

      {/* MENU BURGER */}
      <div className={`navbar-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAVIGATION LINKS */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
        <li><Link to="/conversations" onClick={() => setMenuOpen(false)}>Conversations</Link></li>
        <li><Link to="/account" onClick={() => setMenuOpen(false)}>Mon Compte</Link></li>
        <li><Link to="/users" onClick={() => setMenuOpen(false)}>Gestion des Utilisateurs</Link></li>

        {isAuthenticated ? (
          <li><Logout /></li>
        ) : (
          <>
            <li><Link to="/register" onClick={() => setMenuOpen(false)}>Inscription</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

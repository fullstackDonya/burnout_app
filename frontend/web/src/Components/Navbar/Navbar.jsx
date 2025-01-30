import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté (par exemple, en vérifiant un token dans le localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Supprimez le token ou effectuez d'autres actions de déconnexion
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {!isLoggedIn ? (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        ) : (
          <li>
            <Link to="/" onClick={handleLogout}>Déconnexion</Link>
          </li>
        )}
        <li>
          <Link to="/register">Inscription</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
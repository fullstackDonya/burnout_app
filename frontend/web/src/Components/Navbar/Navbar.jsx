import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Logout/logout"; // Importer le composant Logout
import "./Navbar.css"; 

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {/* <li>
          <Link to="/meeting">Créer un Post</Link>
        </li> */}
        <li>
          <Link to="/conversations">Conversations</Link>
        </li>
        <li>
          <Link to="/account">Mon Compte</Link>
        </li>
        <li>
          <Link to="/users">Gestion des Utilisateurs</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Logout />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Inscription</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
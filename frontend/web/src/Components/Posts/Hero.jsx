import React from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Hero = () => {
  return (
    <section className="hero">
      <header className="home-header">
        <div className="hero-content">
          <h1>Bienvenue sur l'Appli RebootMind</h1>
          <p>Connectez-vous avec des professionnels pour vous accompagner.</p>
          <Link to="/contact" className="btn-primary">Découvrir</Link>
        </div>
      </header>
    </section>
  );
};

export default Hero;
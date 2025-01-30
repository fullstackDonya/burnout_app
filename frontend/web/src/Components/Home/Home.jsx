import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenue sur l'Appli RebootMind</h1>
      </header>
      <main className="home-main">
        <section className="intro">
          <h2>Prendre soin de vous</h2>
          <p>Cette application est conçue pour vous aider à gérer le stress et à retrouver votre équilibre.</p>
        </section>
        <button className="start-button" onClick={handleStart}>Commencer</button>
      </main>
      <footer className="home-footer">
        <p>&copy; 2023 Appli Burn Out. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
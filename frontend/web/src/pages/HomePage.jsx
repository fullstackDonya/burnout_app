import React from 'react';
import Hero from '../Components/Home/Hero';
import Home from '../Components/Home/Home';
import { useNavigate } from 'react-router-dom';
import './css/home.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/home'); // Remplacez '/home' par la route vers laquelle vous souhaitez naviguer
    };

    return (
        <div>
            <div className="home-container">
            
                <Hero />
                <main className="home-main">
                    <div className="home-posts">
                        <div className="post">
                            <h2>Post 1</h2>
                            <p>Description du post 1.</p>
                        </div>
                        <div className="post">
                            <h2>Post 2</h2>
                            <p>Description du post 2.</p>
                        </div>
                        <div className="post">
                            <h2>Post 3</h2>
                            <p>Description du post 3.</p>
                        </div>

                        {/* Ajoutez plus de posts ici */}
                        <Home />
                    </div>

                    <section className="intro">
                        <h2>Prendre soin de vous</h2>
                        <p>Cette application est conçue pour vous aider à gérer le stress et à retrouver votre équilibre.</p>
                        <button className="start-button" onClick={handleStart}>Commencer</button>

                    </section>
                </main>
            </div>
            <footer className="home-footer">
                <p>&copy; 2023 Appli Burn Out. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default HomePage;
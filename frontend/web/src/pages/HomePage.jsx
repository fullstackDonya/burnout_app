import React from 'react';
import Hero from './../Components/Posts/Hero';
import { useNavigate } from 'react-router-dom';
import Posts from '../Components/Posts/Posts'
import Professional from "./../Components/Pro/Professional";
import './css/home.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/questionnaire'); 
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
                        <Posts />
                        <Professional />
                  
                    </div>

                    <section className="intro">
                        <h2>Prendre soin de vous</h2>
                        <p>Cette application est conçue pour vous aider à gérer le stress et à retrouver votre équilibre.</p>
                        <button className="start-button" onClick={handleStart}>Commencer votre diagnostic</button>

                    </section>
                </main>
            </div>
          
        </div>
    );
};

export default HomePage;
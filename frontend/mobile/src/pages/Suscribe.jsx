import React from 'react';
import '../assets/css/form.css';
const Subscribe = () => {  
    return (
        <div>
            <h1>Page de Souscription</h1>
            <form>
                <div>
                    <label htmlFor="name">Nom:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Souscrire</button>
            </form>
        </div>
    );
};

export default Subscribe; 

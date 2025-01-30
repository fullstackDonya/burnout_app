
Frontend - Documentation

Description

Ce projet est une interface utilisateur pour interagir avec l'API backend, permettant de créer, lire, mettre à jour et supprimer des annonces. L'application est construite avec React.

Prérequis

Node.js installé (version 14 ou supérieure)

Installation

Clonez ce dépôt :

git clone <https://github.com/fullstackDonya/intro_react>

Naviguez dans le dossier du frontend :

cd frontend

Installez les dépendances :

npm install

Configuration

Créez un fichier .env à la racine avec la variable suivante :

REACT_APP_API_URL=http://localhost:8080

Lancement

Lancez l'application :

npm start

L'application sera accessible à http://localhost:3000

Fonctionnalités

Page d'accueil : Liste des annonces disponibles

Ajouter une annonce : Formulaire pour créer une nouvelle annonce

Modifier une annonce : Page pour mettre à jour une annonce existante

Supprimer une annonce : Fonctionnalité pour supprimer une annonce

Structure du Projet

components/ : Composants réutilisables de l'interface utilisateur

pages/ : Pages principales de l'application (Accueil, Formulaire, etc.)

services/ : Gestion des appels API avec Axios

Important


Le backend  doit être lancé et accessible avant d'utiliser le frontend.


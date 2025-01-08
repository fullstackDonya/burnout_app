Documentation du Projet Fullstack
Ce projet est une application fullstack MERN (MongoDB, Express, React, Node.js) avec Docker et Kubernetes pour la conteneurisation et l'orchestration. L'application permet de gérer des annonces avec des fonctionnalités de création, lecture, mise à jour et suppression (CRUD).

Frontend - Documentation
Description
Le frontend est une interface utilisateur construite avec React pour interagir avec l'API backend. Elle permet de gérer des annonces via une interface conviviale.

Prérequis
Node.js installé (version 14 ou supérieure)
npm ou yarn pour la gestion des paquets
Installation
Cloner ce dépôt :



git clone https://github.com/fullstackDonya/intro_react
Naviguer dans le dossier du frontend :



cd frontend
Installer les dépendances :



npm install
Configuration
Créer un fichier .env à la racine avec la variable suivante :

env

REACT_APP_API_URL=http://localhost:8080
Lancement
Lancer l'application :



npm start
L'application sera accessible à http://localhost:3000.

Fonctionnalités
Page d'accueil : Liste des annonces disponibles
Ajouter une annonce : Formulaire pour créer une nouvelle annonce
Modifier une annonce : Page pour mettre à jour une annonce existante
Supprimer une annonce : Fonctionnalité pour supprimer une annonce
Structure du Projet
components/ : Composants réutilisables de l'interface utilisateur
pages/ : Pages principales de l'application (Accueil, Formulaire, etc.)
services/ : Gestion des appels API avec Axios
Important : Le backend doit être lancé et accessible avant d'utiliser le frontend.

Backend - Documentation
Description
Le backend est une API RESTful construite avec Node.js et Express. Elle interagit avec une base de données MongoDB pour gérer les annonces.

Prérequis
Node.js installé (version 14 ou supérieure)
MongoDB installé et en cours d'exécution localement ou accessible via un service cloud
Installation
Naviguer dans le dossier du backend :



cd backend
Installer les dépendances :



npm install
Configuration
Créer un fichier .env à la racine avec les variables suivantes :

env

PORT=8080
MONGO_URI=mongodb://localhost:27017/annonces
Lancement
Lancer le serveur backend :



npm start
Le backend sera accessible à http://localhost:8080.

Fonctionnalités
GET /annonces : Récupère toutes les annonces
POST /annonces : Crée une nouvelle annonce
PUT /annonces/:id : Met à jour une annonce
DELETE /annonces/:id : Supprime une annonce
Docker - Documentation
Description
Le projet utilise Docker pour la conteneurisation du backend, du frontend et de la base de données MongoDB.

Prérequis
Docker et Docker Compose installés
Utilisation
Construiser et démarrer les conteneurs :



docker-compose up -d
Les services suivants seront disponibles :

Frontend : http://localhost:3000
Backend : http://localhost:8080
MongoDB : Accessible en interne au conteneur
Docker Compose
Le fichier docker-compose.yml définit les services suivants :

mongo : Base de données MongoDB
backend : Serveur Node.js
frontend : Application React
Kubernetes - Documentation
Description
Le projet peut être déployé sur un cluster Kubernetes pour une orchestration avancée.

Prérequis
kubectl installé
Un cluster Kubernetes fonctionnel (Minikube, Docker Desktop Kubernetes, ou un service cloud)
Déploiement
Appliquer les fichiers de configuration Kubernetes pour chaque composant :



kubectl apply -f nginx-pod.yaml
kubectl apply -f nginx-srv.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
kubectl apply -f mongo-data.yaml
Vérifier que les pods, services et déploiements sont actifs :



kubectl get pods
kubectl get services
kubectl get deployments


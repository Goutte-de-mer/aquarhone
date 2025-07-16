# Projet d'activités nautiques sur le Rhône

## Installation et lancement

### Backend (API Express.js)

1. Naviguer vers le dossier backend
2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Créer un fichier `.env` à la racine du backend :

   ```env
   CONNECTION_STRING="url de la db"
   JWT_SECRET=votre_secret
   NODE_ENV=development
   PORT=8000
   ```

4. Importer les données d'activités :

   - Importer le fichier `activities.json` dans votre base de données

5. Lancer le serveur :
   ```bash
   nodemon
   ```
   Le serveur se lance sur le port **8000**

### Frontend (Next.js 15)

1. Naviguer vers le dossier frontend
2. Installer les dépendances :

   ```bash
   npm install
   ```

3. Créer un fichier `.env.local` à la racine du frontend :

   ```env
   API_URL="http://localhost:8000/api"
   NODE_ENV="development"
   ```

4. Lancer l'application :
   ```bash
   npm run dev
   ```

## Configuration

### Variables d'environnement

**Backend (.env)**

- `CONNECTION_STRING` : URL de connexion à la base de données
- `JWT_SECRET` : Clé secrète pour signer les tokens JWT
- `NODE_ENV` : Environnement (development/production)
- `PORT` : Port d'écoute du serveur (8000)

**Frontend (.env.local)**

- `API_URL` : URL de l'API backend
- `NODE_ENV` : Environnement de développement

## Fonctionnalités

- **Authentification** : S'inscrire, se connecter, se déconnecter
- **Gestion d'activités** : S'inscrire à une activité
- **Affichage** : Voir les 3 premières activités disponibles

## Prérequis

- Node.js
- npm
- Base de données (MongoDB/PostgreSQL selon votre configuration)
- nodemon (pour le backend)

## Technologies utilisées

- **Frontend** : Next.js 15 (App Router)
- **Backend** : Express.js
- **Authentification** : JWT avec cookies httpOnly
- **Base de données** : Selon votre configuration

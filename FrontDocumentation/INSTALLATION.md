# Guide d'installation - ITam Frontend

Guide complet pour installer et configurer l'application ITam sur votre environnement de développement.

## Prérequis

### Logiciels requis

- **Node.js** >= 18.0.0
  - Télécharger depuis [nodejs.org](https://nodejs.org/)
  - Vérifier l'installation : `node --version`

- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
  - npm est inclus avec Node.js
  - Vérifier l'installation : `npm --version`

- **Git** (recommandé)
  - Pour cloner le repository
  - Vérifier l'installation : `git --version`

### Environnement recommandé

- **Système d'exploitation** : Windows, macOS ou Linux
- **Éditeur de code** : VS Code (avec extensions React, ESLint)
- **Navigateur** : Chrome, Firefox, Edge (version récente)

## Installation

### 1. Cloner le repository

```bash
git clone <repository-url>
cd ITam
```

### 2. Installer les dépendances

Avec npm :
```bash
npm install
```

Ou avec yarn :
```bash
yarn install
```

Cette commande va installer toutes les dépendances listées dans `package.json` :

**Dépendances de production :**
- react (19.2.0)
- react-dom (19.2.0)
- react-router-dom (7.9.6)
- bootstrap (5.3.8)
- @popperjs/core (2.11.8)
- lucide-react (0.554.0)
- prop-types (15.8.1)

**Dépendances de développement :**
- vite (7.2.4)
- @vitejs/plugin-react-swc (4.2.2)
- eslint et plugins
- @types/react et @types/react-dom

### 3. Configuration

Aucune configuration supplémentaire n'est requise pour un environnement de développement standard. Le projet utilise les configurations par défaut de Vite.

## Démarrage

### Mode développement

```bash
npm run dev
```

Cette commande :
- Lance le serveur de développement Vite
- Active le Hot Module Replacement (HMR)
- Ouvre l'application sur `http://localhost:5173`

### Options de développement

```bash
# Spécifier un port différent
npm run dev -- --port 3000

# Ouvrir automatiquement le navigateur
npm run dev -- --open
```

## Build de production

### Créer un build optimisé

```bash
npm run build
```

Cette commande :
- Compile et optimise le code
- Minifie les fichiers JS et CSS
- Génère les fichiers dans le dossier `dist/`
- Optimise les images et assets

### Prévisualiser le build

```bash
npm run preview
```

Lance un serveur local pour tester le build de production sur `http://localhost:4173`

## Linting

### Vérifier le code

```bash
npm run lint
```

Cette commande exécute ESLint sur tous les fichiers du projet et affiche les erreurs et avertissements.

### Configuration ESLint

Le projet utilise :
- `@eslint/js` pour les règles de base
- `eslint-plugin-react-hooks` pour les hooks React
- `eslint-plugin-react-refresh` pour Fast Refresh

Configuration dans `eslint.config.js`

## Structure après installation

```
ITam/
├── node_modules/           # Dépendances installées (créé après npm install)
├── public/                 # Fichiers statiques
│   └── assets/
│       └── images/        # Images (logos, etc.)
├── src/                   # Code source
├── dist/                  # Build de production (créé après npm run build)
├── .yarn/                 # Cache Yarn (si utilisation de Yarn)
├── package.json           # Configuration du projet
├── package-lock.json      # Lock file npm
├── vite.config.js         # Configuration Vite
├── eslint.config.js       # Configuration ESLint
└── README.md             # Documentation principale
```

## Dépannage

### Erreur : "Cannot find module"

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 déjà utilisé

```bash
# Utiliser un port différent
npm run dev -- --port 3000
```

### Erreurs ESLint

```bash
# Vérifier la configuration ESLint
npm run lint

# Ignorer temporairement (déconseillé)
# Ajouter /* eslint-disable */ en haut du fichier
```

### Build échoue

```bash
# Nettoyer le cache et rebuild
rm -rf dist .vite
npm run build
```

### Problèmes avec Yarn

Si vous utilisez Yarn et rencontrez des problèmes :

```bash
# Nettoyer le cache Yarn
yarn cache clean

# Réinstaller
rm -rf node_modules .yarn
yarn install
```

## Variables d'environnement

Actuellement, le projet n'utilise pas de variables d'environnement spécifiques. Si vous devez en ajouter :

1. Créer un fichier `.env` à la racine
2. Préfixer les variables avec `VITE_`
3. Accéder aux variables via `import.meta.env.VITE_NOM_VARIABLE`

Exemple :
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=ITam
```

## Backend API

Le frontend communique avec une API Symfony située dans le dossier `ITamAPI/`.

Pour un fonctionnement complet :
1. Installer et démarrer l'API backend
2. Configurer l'URL de l'API dans le frontend (à venir)
3. Vérifier que CORS est configuré sur le backend

## Prochaines étapes

Après l'installation réussie :

1. Lire la [documentation d'architecture](./ARCHITECTURE.md)
2. Explorer les [composants disponibles](./COMPONENTS.md)
3. Consulter le [guide de routing](./ROUTING.md)
4. Comprendre le [système de traduction](./INTERNATIONALIZATION.md)

## Scripts disponibles

| Script | Commande | Description |
|--------|----------|-------------|
| dev | `npm run dev` | Démarre le serveur de développement |
| build | `npm run build` | Crée un build de production |
| preview | `npm run preview` | Prévisualise le build de production |
| lint | `npm run lint` | Vérifie le code avec ESLint |

## Support

Pour toute question ou problème d'installation :
1. Vérifier la version de Node.js et npm
2. Consulter les logs d'erreur
3. Rechercher dans les issues du projet
4. Contacter l'équipe de développement

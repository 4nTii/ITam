# ITam - Frontend

Application web de gestion de parc informatique (IT Asset Management) développée avec React.

## Technologies

- **React 19.2** - Bibliothèque UI
- **Vite 7.2** - Build tool et dev server
- **React Router DOM 7.9** - Routing
- **Bootstrap 5.3** - Framework CSS
- **Lucide React** - Icônes
- **ESLint** - Linter

## Prérequis

- Node.js >= 18
- npm ou yarn

## Installation

```bash
# Installer les dépendances
npm install

# ou avec yarn
yarn install
```

## Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter le code
npm run lint
```

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   └── uiHTMLElements/     # Composants UI (boutons, checkboxes, etc.)
├── pages/              # Pages de l'application
│   ├── auth/          # Pages d'authentification
│   └── Dashboard.jsx  # Tableau de bord
├── lang/              # Fichiers de traduction (multilingue)
├── App.jsx            # Composant principal
└── main.jsx           # Point d'entrée
```

## Fonctionnalités

- Authentification utilisateur
- Dashboard de gestion
- Interface multilingue
- Support du thème sombre
- Gestion du parc informatique
- Gestion des affectations de matériel
- Suivi des cargaisons

## Configuration

Le projet utilise Vite avec le plugin `@vitejs/plugin-react-swc` pour Fast Refresh.

## Documentation

Voir le dossier `ITam documentation/` à la racine du projet pour :
- Diagrammes UML
- Cahier des charges
- Architecture du système

## API Backend

Le frontend communique avec l'API Symfony située dans le dossier `ITamAPI/`.

## Développement

1. Assurez-vous que l'API backend est lancée
2. Démarrez le serveur de dev : `npm run dev`
3. L'application sera accessible sur `http://localhost:5173`

## Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

# Documentation Frontend - ITam

Bienvenue dans la documentation complète du frontend de l'application ITam (IT Asset Management).

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Documentation détaillée](#documentation-détaillée)
3. [Démarrage rapide](#démarrage-rapide)

## Vue d'ensemble

ITam est une application web de gestion de parc informatique développée avec React 19.2 et Vite 7.2. L'application offre une interface moderne et réactive pour gérer les actifs informatiques.

### Technologies principales

- **React 19.2** - Bibliothèque UI moderne
- **Vite 7.2** - Build tool ultra-rapide
- **React Router DOM 7.9** - Gestion du routing
- **Bootstrap 5.3** - Framework CSS responsive
- **Lucide React 0.554** - Bibliothèque d'icônes
- **PropTypes** - Validation des props des composants

### Fonctionnalités

- Authentification utilisateur (Login, Signup, Password Recovery)
- Dashboard de gestion
- Interface multilingue (i18n prête)
- Composants UI réutilisables
- Design responsive avec Bootstrap

## Documentation détaillée

Cette documentation est organisée en plusieurs sections :

### 📋 [INSTALLATION.md](./INSTALLATION.md)
Guide complet d'installation et de configuration du projet.

### 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md)
Description de l'architecture du projet, structure des dossiers et patterns utilisés.

### 🧩 [COMPONENTS.md](./COMPONENTS.md)
Documentation détaillée de tous les composants UI réutilisables.

### 🛣️ [ROUTING.md](./ROUTING.md)
Configuration et gestion des routes de l'application.

### 🎨 [STYLING.md](./STYLING.md)
Guide des conventions de style, utilisation de Bootstrap et CSS personnalisé.

### 🌍 [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)
Système de traduction et gestion multilingue.

### 📄 [PAGES.md](./PAGES.md)
Documentation des différentes pages de l'application.

## Démarrage rapide

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build

# Linter le code
npm run lint
```

L'application sera accessible sur `http://localhost:5173`

## Structure du projet

```
ITam/
├── public/                  # Fichiers statiques
├── src/
│   ├── components/         # Composants réutilisables
│   │   └── uiHTMLElements/    # Composants UI (UIButton, UICheckbox)
│   ├── pages/             # Pages de l'application
│   │   ├── auth/         # Pages d'authentification
│   │   └── Dashboard.jsx # Tableau de bord
│   ├── lang/             # Fichiers de traduction
│   ├── App.jsx           # Composant principal avec routing
│   ├── App.css           # Styles globaux
│   └── main.jsx          # Point d'entrée
├── FrontDocumentation/    # Cette documentation
└── package.json          # Dépendances et scripts
```

## Conventions de développement

- Utiliser les composants UI réutilisables (UIButton, UICheckbox) pour la cohérence
- Suivre la structure de dossiers établie
- Utiliser le système de traduction (LangMessages) pour tous les textes
- Valider les props avec PropTypes
- Suivre les conventions de nommage React (PascalCase pour les composants)

## Support et contribution

Pour toute question ou contribution :
1. Consultez d'abord cette documentation
2. Vérifiez le code des composants existants pour les patterns
3. Respectez les conventions établies
4. Testez vos modifications avant de commit

## Version

Version actuelle : 0.0.0 (en développement)

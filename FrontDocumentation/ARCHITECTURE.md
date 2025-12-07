# Architecture du projet ITam

Documentation de l'architecture technique et organisationnelle du frontend ITam.

## Vue d'ensemble

ITam est une Single Page Application (SPA) React utilisant une architecture modulaire basée sur des composants réutilisables et une séparation claire des responsabilités.

## Stack technique

### Framework et build

- **React 19.2** : Bibliothèque UI avec les dernières fonctionnalités
- **Vite 7.2** : Build tool moderne avec Hot Module Replacement
- **@vitejs/plugin-react-swc** : Compilation ultra-rapide avec SWC

### Routing

- **React Router DOM 7.9** : Navigation côté client avec routing déclaratif

### UI et styling

- **Bootstrap 5.3** : Framework CSS pour layout et composants de base
- **Lucide React** : Bibliothèque d'icônes modernes et légères
- **CSS personnalisé** : Styles spécifiques par composant

### Qualité de code

- **ESLint 9.39** : Linter JavaScript/React
- **PropTypes** : Validation des props à l'exécution
- **React Hooks ESLint Plugin** : Règles spécifiques pour les hooks

## Structure des dossiers

```
ITam/
├── public/                      # Assets statiques
│   └── assets/
│       └── images/             # Images, logos, icônes
│           └── itam_logo_uhd_svg.svg
│
├── src/                        # Code source
│   ├── components/            # Composants réutilisables
│   │   └── uiHTMLElements/       # Composants UI de base
│   │       ├── UIButton.jsx
│   │       ├── UIButton.css
│   │       ├── UICheckbox.jsx
│   │       └── UICheckbox.css
│   │
│   ├── pages/                # Pages/vues de l'application
│   │   ├── auth/            # Pages d'authentification
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   └── Dashboard.jsx    # Page principale
│   │
│   ├── lang/                # Internationalisation
│   │   └── lang.js         # Messages de traduction
│   │
│   ├── App.jsx             # Composant racine avec routing
│   ├── App.css             # Styles globaux
│   └── main.jsx            # Point d'entrée de l'application
│
├── FrontDocumentation/         # Documentation du projet
├── node_modules/              # Dépendances
├── .yarn/                     # Cache Yarn
│
├── vite.config.js            # Configuration Vite
├── eslint.config.js          # Configuration ESLint
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation principale
```

## Patterns et conventions

### Architecture des composants

L'application suit une architecture en couches :

```
┌─────────────────────────────────────┐
│         main.jsx (Entry)            │
│  - Import Bootstrap CSS             │
│  - Render App dans StrictMode       │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│         App.jsx (Router)            │
│  - BrowserRouter                    │
│  - Routes configuration             │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│         Pages (Views)               │
│  - Login, Dashboard, etc.           │
│  - Gestion d'état local             │
│  - Composition de UI Elements       │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      UI Elements (Components)       │
│  - UIButton, UICheckbox             │
│  - Composants réutilisables         │
│  - PropTypes validation             │
└─────────────────────────────────────┘
```

### Principes de conception

#### 1. Composants réutilisables (components/uiHTMLElements/)

**Caractéristiques :**
- Composants génériques et configurables
- Props validées avec PropTypes
- CSS scopé par composant
- Documentation inline (JSDoc)
- Pas de logique métier

**Exemple :**
```jsx
// UIButton : composant bouton générique
<UIButton
  label="Se connecter"
  onClick={handleLogin}
  className="btn-primary"
  loading={isLoading}
/>
```

#### 2. Pages (pages/)

**Responsabilités :**
- Composition de composants UI
- Gestion d'état local avec hooks (useState, useEffect)
- Navigation avec useNavigate
- Logique métier spécifique à la vue

**Exemple :**
```jsx
// Login.jsx : page d'authentification
function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Logique de la page...
}
```

#### 3. Internationalisation (lang/)

**Structure :**
```javascript
export const LangMessages = {
  currentLanguage: "en",
  application: { ... },
  auth: { ... },
  user: { ... }
}
```

**Utilisation :**
```jsx
import { LangMessages } from "../../lang/lang";

<h3>{LangMessages.auth.login}</h3>
```

### Conventions de nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `UIButton.jsx`, `Dashboard.jsx` |
| Fichiers CSS | Même nom que le composant | `UIButton.css`, `Login.css` |
| Fonctions | camelCase | `handleChange`, `setRememberMe` |
| Variables | camelCase | `rememberMe`, `isLoading` |
| Constantes | PascalCase (exports) | `LangMessages` |
| Props | camelCase | `onClick`, `className`, `disabled` |

### Organisation CSS

#### Stratégie de styling

1. **Bootstrap** : Layout, grille, utilitaires
2. **CSS personnalisé** : Styles spécifiques aux composants
3. **CSS scopé** : Un fichier CSS par composant

**Exemple de structure CSS :**
```css
/* UIButton.css */
.btn {
  /* Styles du bouton */
}

.ui-btn-label {
  /* Style du label */
}

.spinner-border {
  /* Bootstrap override si nécessaire */
}
```

## Flux de données

### État local (useState)

Utilisé pour :
- État des formulaires (checkboxes, inputs)
- État UI temporaire (modals, dropdowns)
- Données ne nécessitant pas de partage

**Exemple :**
```jsx
const [rememberMe, setRememberMe] = useState(false);
const [selectedOptions, setSelectedOptions] = useState([]);
```

### Navigation (React Router)

**Configuration dans App.jsx :**
```jsx
<BrowserRouter>
  <Routes>
    <Route path="" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
```

**Navigation programmatique :**
```jsx
const navigate = useNavigate();
navigate("/dashboard");
```

## Configuration Build

### Vite configuration (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // Configuration Fast Refresh avec SWC
})
```

**Avantages de Vite + SWC :**
- Démarrage instantané du serveur dev
- Hot Module Replacement ultra-rapide
- Build optimisé avec Rollup
- Compilation Rust (SWC) plus rapide que Babel

### ESLint configuration (eslint.config.js)

Configuration pour :
- Règles JavaScript ES6+
- Règles spécifiques React
- Validation des hooks
- React Fast Refresh

## Scalabilité

### Extensions futures prévues

L'architecture actuelle supporte facilement :

1. **Gestion d'état globale**
   - Ajout de Redux ou Zustand si nécessaire
   - Context API pour thèmes/auth

2. **Services API**
   - Dossier `src/services/` pour les appels API
   - Axios ou Fetch abstraction

3. **Utilitaires**
   - Dossier `src/utils/` pour helpers
   - Fonctions de validation, formatage, etc.

4. **Hooks personnalisés**
   - Dossier `src/hooks/` pour hooks réutilisables
   - useAuth, useApi, useTheme, etc.

5. **Tests**
   - Jest + React Testing Library
   - Tests unitaires et d'intégration

### Structure recommandée à long terme

```
src/
├── components/
│   ├── uiHTMLElements/      # Composants UI de base
│   ├── common/          # Composants partagés
│   └── layout/          # Layout (Header, Sidebar, Footer)
├── pages/               # Pages/vues
├── services/            # Appels API
├── hooks/               # Hooks personnalisés
├── utils/               # Fonctions utilitaires
├── context/             # Context API providers
├── lang/                # Internationalisation
├── assets/              # Images, fonts (si non public)
├── constants/           # Constantes de l'app
└── types/              # Types PropTypes ou TypeScript
```

## Bonnes pratiques

### Développement de composants

1. **Un composant = Un fichier**
2. **PropTypes obligatoire** pour tous les composants
3. **Documentation inline** (JSDoc) pour les composants complexes
4. **CSS scopé** : éviter les styles globaux
5. **Composition over inheritance** : composer avec des composants plus petits

### Performance

1. **Lazy loading** : Code splitting pour les routes
2. **Memoization** : React.memo pour composants lourds
3. **Optimisation images** : Formats optimisés, lazy loading
4. **Vite optimizations** : Tree shaking automatique

### Sécurité

1. **Validation des inputs** utilisateur
2. **XSS protection** : Éviter dangerouslySetInnerHTML
3. **HTTPS** en production
4. **Variables d'environnement** pour secrets (pas de hardcode)

## Intégration backend

### API Symfony

Le frontend est conçu pour s'intégrer avec l'API Symfony :

**Futures implémentations :**
```javascript
// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

## Outils de développement

### Recommandations VS Code

Extensions recommandées :
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Path Intellisense

### DevTools

- **React DevTools** : Inspection des composants
- **Redux DevTools** : Si utilisation de Redux
- **Vite DevTools** : Analyse du bundle

## Conclusion

L'architecture actuelle est :
- **Simple et maintenable** : Structure claire
- **Scalable** : Prête pour évolutions futures
- **Performante** : Vite + React 19 + SWC
- **Moderne** : Best practices React 2025

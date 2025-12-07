# Documentation du Routing - ITam

Guide complet du système de routing et de navigation dans l'application ITam.

## Vue d'ensemble

ITam utilise **React Router DOM v7.9** pour gérer la navigation côté client dans cette Single Page Application (SPA).

## Configuration

### Installation

React Router DOM est déjà installé dans le projet :

```json
"dependencies": {
  "react-router-dom": "^7.9.6"
}
```

### Configuration principale

Le routing est configuré dans `src/App.jsx` :

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Routes actuelles

| Path | Composant | Description |
|------|-----------|-------------|
| `/` | `Dashboard` | Page d'accueil / tableau de bord |
| `/login` | `Login` | Page de connexion |

## Composants React Router

### BrowserRouter

Conteneur principal qui active le routing dans l'application.

```jsx
<BrowserRouter>
  {/* Routes de l'application */}
</BrowserRouter>
```

**Caractéristiques :**
- Utilise l'API History du navigateur
- URLs propres (sans `#`)
- Nécessite configuration serveur en production

### Routes

Conteneur pour toutes les routes de l'application.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### Route

Définit une correspondance entre un path et un composant.

```jsx
<Route path="/login" element={<Login />} />
```

## Navigation

### Navigation programmatique

Utiliser le hook `useNavigate` pour naviguer par code :

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Logique de connexion...

    // Redirection vers le dashboard
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <button onClick={handleLogin}>Se connecter</button>
      <a onClick={() => navigate("/signup")}>S'inscrire</a>
    </>
  );
}
```

#### Options de navigation

```jsx
// Navigation simple
navigate("/dashboard");

// Navigation avec remplacement de l'historique (pas de retour arrière)
navigate("/dashboard", { replace: true });

// Navigation relative
navigate("../profile");

// Navigation arrière
navigate(-1);

// Navigation avant
navigate(1);
```

### Navigation déclarative avec Link

Pour les liens classiques, utiliser le composant `Link` :

```jsx
import { Link } from "react-router-dom";

<Link to="/dashboard">Tableau de bord</Link>
<Link to="/profile">Mon profil</Link>
```

#### NavLink pour menu actif

`NavLink` ajoute automatiquement des classes pour l'élément actif :

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/dashboard"
  className={({ isActive }) => isActive ? "active" : ""}
>
  Dashboard
</NavLink>
```

## Gestion des paramètres

### Paramètres d'URL

#### Définition
```jsx
<Route path="/user/:id" element={<UserProfile />} />
```

#### Utilisation
```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return <div>Profil utilisateur #{id}</div>;
}
```

### Query Parameters

```jsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q");
  const filter = searchParams.get("filter");

  // Modifier les query params
  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, filter: "all" });
  };

  return <div>Recherche : {query}</div>;
}
```

## Routes protégées

### Implémentation d'une route protégée

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = checkAuth(); // Votre logique d'auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Utilisation
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Routes futures

### Routes d'authentification

```jsx
<Routes>
  {/* Authentification */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/password-recovery" element={<PasswordRecovery />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
</Routes>
```

### Routes principales

```jsx
<Routes>
  {/* Dashboard */}
  <Route path="/" element={<Dashboard />} />

  {/* Gestion des actifs */}
  <Route path="/assets" element={<AssetList />} />
  <Route path="/assets/:id" element={<AssetDetail />} />
  <Route path="/assets/new" element={<AssetCreate />} />
  <Route path="/assets/:id/edit" element={<AssetEdit />} />

  {/* Affectations */}
  <Route path="/assignments" element={<AssignmentList />} />
  <Route path="/assignments/:id" element={<AssignmentDetail />} />

  {/* Cargaisons */}
  <Route path="/shipments" element={<ShipmentList />} />
  <Route path="/shipments/:id" element={<ShipmentDetail />} />

  {/* Profil utilisateur */}
  <Route path="/profile" element={<UserProfile />} />
  <Route path="/settings" element={<Settings />} />

  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Layouts et routes imbriquées

### Layout avec Outlet

Pour partager un layout entre plusieurs pages :

```jsx
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <Outlet /> {/* Les pages enfants s'affichent ici */}
      </main>
      <Footer />
    </div>
  );
}

// Configuration
<Routes>
  <Route element={<MainLayout />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/assets" element={<AssetList />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
</Routes>
```

### Routes imbriquées

```jsx
<Routes>
  <Route path="/settings" element={<SettingsLayout />}>
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="security" element={<SecuritySettings />} />
    <Route path="notifications" element={<NotificationSettings />} />
  </Route>
</Routes>

// URLs générées :
// /settings/profile
// /settings/security
// /settings/notifications
```

## Gestion des erreurs

### Page 404

```jsx
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="text-center p-5">
      <h1>404</h1>
      <p>Page non trouvée</p>
      <button onClick={() => navigate("/")}>
        Retour à l'accueil
      </button>
    </div>
  );
}

// Route catch-all
<Route path="*" element={<NotFound />} />
```

### Error Boundary

```jsx
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Une erreur est survenue</p>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  );
}

// Configuration
<Route path="/" element={<Dashboard />} errorElement={<ErrorPage />} />
```

## Hooks React Router

### useNavigate

Navigation programmatique.

```jsx
const navigate = useNavigate();
navigate("/path");
```

### useParams

Récupérer les paramètres d'URL.

```jsx
const { id } = useParams();
```

### useSearchParams

Gérer les query parameters.

```jsx
const [searchParams, setSearchParams] = useSearchParams();
```

### useLocation

Accéder aux informations de localisation.

```jsx
const location = useLocation();
console.log(location.pathname); // "/current/path"
console.log(location.search);   // "?query=value"
console.log(location.hash);     // "#section"
console.log(location.state);    // État passé via navigate
```

### useNavigationType

Connaître le type de navigation.

```jsx
const navigationType = useNavigationType();
// "POP" | "PUSH" | "REPLACE"
```

## Passage de données entre routes

### Via state

```jsx
// Navigation avec state
navigate("/profile", {
  state: { fromDashboard: true, userId: 123 }
});

// Récupération
const location = useLocation();
const { fromDashboard, userId } = location.state || {};
```

### Via URL parameters

```jsx
// Navigation
navigate(`/user/${userId}/edit`);

// Récupération
const { userId } = useParams();
```

### Via query string

```jsx
// Navigation
navigate(`/search?q=${searchTerm}&filter=active`);

// Récupération
const [searchParams] = useSearchParams();
const query = searchParams.get("q");
const filter = searchParams.get("filter");
```

## Configuration production

### Serveur web

Pour que le routing fonctionne en production, configurer le serveur pour rediriger toutes les requêtes vers `index.html`.

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Vite preview
Le serveur de preview Vite gère automatiquement le routing.

```bash
npm run preview
```

## Bonnes pratiques

### 1. Organisation des routes

```jsx
// ✅ Bon : Routes organisées et commentées
<Routes>
  {/* Public routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/assets" element={<AssetList />} />
  </Route>

  {/* Catch-all */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 2. Constantes pour les paths

```jsx
// src/constants/routes.js
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ASSETS: "/assets",
  ASSET_DETAIL: (id) => `/assets/${id}`,
};

// Utilisation
navigate(ROUTES.DASHBOARD);
<Route path={ROUTES.LOGIN} element={<Login />} />
```

### 3. Lazy loading

Charger les composants à la demande :

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AssetList = lazy(() => import("./pages/AssetList"));

<Suspense fallback={<div>Chargement...</div>}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/assets" element={<AssetList />} />
  </Routes>
</Suspense>
```

### 4. Breadcrumbs

```jsx
import { useLocation, Link } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <nav>
      <Link to="/">Accueil</Link>
      {pathnames.map((name, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <span key={to}>
            {" > "}
            <Link to={to}>{name}</Link>
          </span>
        );
      })}
    </nav>
  );
}
```

## Références

- [React Router Documentation](https://reactrouter.com/)
- [React Router v6 Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Migration Guide](https://reactrouter.com/en/main/upgrading/v6)

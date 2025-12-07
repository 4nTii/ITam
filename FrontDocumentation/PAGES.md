# Documentation des Pages - ITam

Guide complet de toutes les pages de l'application ITam.

## Vue d'ensemble

Les pages sont les vues principales de l'application, situées dans `src/pages/`. Chaque page correspond à une route de l'application et est composée de composants UI réutilisables.

## Pages actuelles

### Dashboard

Page d'accueil principale de l'application.

#### Localisation
- **Fichier** : `src/pages/Dashboard.jsx`
- **Route** : `/`
- **Accès** : Publique (à sécuriser)

#### Code actuel

```jsx
import React, { useEffect } from "react";
import UICheckbox from "../components/uiHTMLElements/UICheckbox.jsx";
import { useState } from "react";

function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return <div>Home page</div>;
}

export default Dashboard;
```

#### État actuel

La page Dashboard est actuellement en construction. Elle affiche simplement "Home page".

#### Développements prévus

La page Dashboard devrait inclure :

1. **Statistiques** : Nombre d'actifs, affectations, etc.
2. **Graphiques** : Visualisations des données
3. **Activité récente** : Dernières actions effectuées
4. **Raccourcis** : Accès rapide aux fonctionnalités principales

#### Exemple de structure complète

```jsx
function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les statistiques
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // API call
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="container-fluid p-4">
        <h1 className="mb-4">Dashboard</h1>

        {/* Statistiques */}
        <div className="row mb-4">
          <div className="col-md-3">
            <StatCard
              title="Total Assets"
              value={stats.totalAssets}
              icon="package"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              title="Assignments"
              value={stats.assignments}
              icon="user-check"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              title="Shipments"
              value={stats.shipments}
              icon="truck"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              title="Available"
              value={stats.available}
              icon="check-circle"
            />
          </div>
        </div>

        {/* Graphiques */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Assets Over Time</div>
              <div className="card-body">
                {/* Chart component */}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Asset Types</div>
              <div className="card-body">
                {/* Pie chart */}
              </div>
            </div>
          </div>
        </div>

        {/* Activité récente */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">Recent Activity</div>
              <div className="card-body">
                <RecentActivityList items={stats.recentActivity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Login

Page de connexion pour les utilisateurs.

#### Localisation
- **Fichier** : `src/pages/auth/Login.jsx`
- **Styles** : `src/pages/auth/Login.css`
- **Route** : `/login`
- **Accès** : Publique

#### Code actuel

```jsx
import { LangMessages } from "../../lang/lang";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import UIButton from "../../components/uiHTMLElements/UIButton";
import UICheckbox from "../../components/uiHTMLElements/UICheckbox";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange_CheckBox = (event) => {
    event.target && setRememberMe(event.target.checked);
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-container">
      <div className="p-4 shadow rounded login-box">
        <div className="loginHeader">
          <img
            src="/assets/images/itam_logo_uhd_svg.svg"
            alt={LangMessages.application.appName}
            className="login-logo"
          />
          <h3 className="text-center mb-4">{LangMessages.auth.login}</h3>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              {LangMessages.auth.email}
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder={LangMessages.auth.enterEmail}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              {LangMessages.auth.password}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder={LangMessages.auth.enterPassword}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <UICheckbox
              id="RememberMe"
              checked={rememberMe}
              label={LangMessages.auth.rememberMe}
              value="rememberMe"
              onChange={handleChange_CheckBox}
            />
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/password-recovery")}
            >
              {LangMessages.auth.forgotPassword}
            </a>
          </div>

          <UIButton
            type="submit"
            className="btn-primary w-100"
            label={LangMessages.auth.login}
          />

          <p className="text-center mt-3">
            {LangMessages.auth.dontHaveAccount}{" "}
            <a
              className="btn-link p-0 text-decoration-none"
              onClick={() => navigate("/signup")}
            >
              {LangMessages.auth.signup}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
```

#### Fonctionnalités

1. **Formulaire de connexion**
   - Champ email
   - Champ mot de passe
   - Case "Se souvenir de moi"

2. **Navigation**
   - Lien vers "Mot de passe oublié" (`/password-recovery`)
   - Lien vers inscription (`/signup`)

3. **Internationalisation**
   - Tous les textes utilisent `LangMessages`

4. **Composants UI**
   - `UIButton` pour le bouton de soumission
   - `UICheckbox` pour "Remember me"

#### État

- `rememberMe` : Boolean pour la checkbox

#### Améliorations futures

```jsx
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!formData.email || !formData.password) {
        setError(LangMessages.errors.allFieldsRequired);
        return;
      }

      // API call
      const response = await api.login(formData.email, formData.password);

      // Save token
      if (formData.rememberMe) {
        localStorage.setItem("token", response.token);
      } else {
        sessionStorage.setItem("token", response.token);
      }

      // Redirect
      navigate("/");
    } catch (err) {
      setError(err.message || LangMessages.errors.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <UIButton
            type="submit"
            loading={loading}
            label={LangMessages.auth.login}
          />
        </form>
      </div>
    </div>
  );
}
```

---

## Pages à créer

### Signup (Inscription)

#### Route : `/signup`

```jsx
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert(LangMessages.errors.passwordMismatch);
      return;
    }

    // API call
    try {
      await api.signup(formData.email, formData.password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h3>{LangMessages.auth.signup}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">{LangMessages.auth.email}</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">{LangMessages.auth.password}</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword">
              {LangMessages.auth.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <UIButton
            type="submit"
            className="btn-primary w-100"
            label={LangMessages.auth.signup}
          />

          <p className="text-center mt-3">
            {LangMessages.auth.alreadyAccount}{" "}
            <a onClick={() => navigate("/login")}>
              {LangMessages.auth.login}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

### Password Recovery

#### Route : `/password-recovery`

```jsx
function PasswordRecovery() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.sendPasswordRecoveryEmail(email);
      setSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="recovery-container">
        <div className="recovery-box">
          <h3>Email envoyé !</h3>
          <p>Vérifiez votre boîte mail pour réinitialiser votre mot de passe.</p>
          <UIButton
            label="Retour à la connexion"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="recovery-container">
      <div className="recovery-box">
        <h3>{LangMessages.auth.passwordRecovery}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">{LangMessages.auth.email}</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <UIButton
            type="submit"
            className="btn-primary w-100"
            label={LangMessages.auth.sendRecoveryEmail}
            loading={loading}
          />

          <p className="text-center mt-3">
            {LangMessages.auth.passwordRemembered}{" "}
            <a onClick={() => navigate("/login")}>
              {LangMessages.auth.login}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

### Asset List

#### Route : `/assets`

```jsx
function AssetList() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await api.getAssets();
      setAssets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Assets</h1>
        <UIButton
          label="Add Asset"
          className="btn-primary"
          onClick={() => navigate("/assets/new")}
        />
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.status}</td>
                <td>{asset.assignedTo || "-"}</td>
                <td>
                  <UIButton
                    label="View"
                    className="btn-sm btn-primary"
                    onClick={() => navigate(`/assets/${asset.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

### User Profile

#### Route : `/profile`

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const data = await api.getUserProfile();
    setUser(data);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container p-4">
      <h1>My Profile</h1>

      <div className="card mt-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Name:</strong>
            </div>
            <div className="col-md-9">
              {editing ? (
                <input
                  type="text"
                  className="form-control"
                  value={user.name}
                />
              ) : (
                user.name
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Email:</strong>
            </div>
            <div className="col-md-9">{user.email}</div>
          </div>

          <div className="mt-4">
            {editing ? (
              <>
                <UIButton
                  label="Save"
                  className="btn-primary me-2"
                  onClick={() => setEditing(false)}
                />
                <UIButton
                  label="Cancel"
                  className="btn-secondary"
                  onClick={() => setEditing(false)}
                />
              </>
            ) : (
              <UIButton
                label="Edit"
                className="btn-primary"
                onClick={() => setEditing(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 404 Not Found

#### Route : `*` (catch-all)

```jsx
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <UIButton
        label="Go to Dashboard"
        className="btn-primary"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
```

## Bonnes pratiques

### 1. Structure de page cohérente

```jsx
function PageName() {
  // 1. Hooks
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  // 2. Effects
  useEffect(() => {
    fetchData();
  }, []);

  // 3. Handlers
  const handleAction = () => {
    // ...
  };

  // 4. Early returns
  if (loading) return <Loader />;
  if (error) return <Error />;

  // 5. Render principal
  return (
    <div className="page-container">
      {/* Content */}
    </div>
  );
}
```

### 2. Gestion des états

```jsx
// ✅ Bon : États clairs et organisés
const [formData, setFormData] = useState({
  email: "",
  password: "",
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// ❌ Mauvais : États dispersés
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(null);
```

### 3. Utilisation des composants UI

```jsx
// ✅ Bon : Utiliser les composants UI
<UIButton label="Submit" className="btn-primary" />

// ❌ Mauvais : Recréer des boutons
<button className="btn btn-primary">Submit</button>
```

### 4. Internationalisation

```jsx
// ✅ Bon : Utiliser LangMessages
<h1>{LangMessages.pages.dashboard.title}</h1>

// ❌ Mauvais : Texte hardcodé
<h1>Dashboard</h1>
```

## Organisation des fichiers

```
src/pages/
├── auth/
│   ├── Login.jsx
│   ├── Login.css
│   ├── Signup.jsx
│   ├── Signup.css
│   ├── PasswordRecovery.jsx
│   └── PasswordRecovery.css
├── assets/
│   ├── AssetList.jsx
│   ├── AssetDetail.jsx
│   ├── AssetCreate.jsx
│   └── AssetEdit.jsx
├── Dashboard.jsx
├── UserProfile.jsx
└── NotFound.jsx
```

## Conclusion

Les pages constituent la couche de présentation de l'application. Elles :
- Orchestrent les composants UI
- Gèrent l'état local
- Communiquent avec l'API
- Gèrent la navigation

Suivre ces patterns assure une cohérence et une maintenabilité optimales.

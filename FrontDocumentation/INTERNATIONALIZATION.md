# Internationalisation (i18n) - ITam

Documentation du système de traduction et de gestion multilingue de l'application ITam.

## Vue d'ensemble

ITam utilise un système d'internationalisation simple basé sur un objet JavaScript exporté contenant tous les messages traduits. Le système est prêt pour l'extension multilingue.

## Fichier de traduction

### Localisation

**Fichier** : `src/lang/lang.js`

### Structure actuelle

```javascript
export const LangMessages = {
  currentLanguage: "en",

  application: {
    appName: "ITam",
    appSlogon: "IT Assets Manager",
  },

  auth: {
    login: "Login",
    signin: "Sign in",
    signup: "Sign up",
    dontHaveAccount: "Don't have an account?",
    email: "Email address",
    enterEmail: "Enter your email",
    confirmPassword: "Confirm password",
    password: "Password",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    alreadyAccount: "Already have an account?",
    passwordRecovery: "Password Recovery",
    sendRecoveryEmail: "Send Recovery Email",
    passwordRemembered: "Remembered your password?",
    logout: "Log out",
  },

  user: {
    profil: "Profil",
    help: "Help!",
    notification: "Notification",
    notifications: "Notifications",
  },
};

export default LangMessages;
```

## Utilisation dans les composants

### Import

```javascript
import { LangMessages } from "../../lang/lang";
```

### Utilisation basique

```jsx
function Login() {
  return (
    <div>
      <h3>{LangMessages.auth.login}</h3>
      <label>{LangMessages.auth.email}</label>
      <input placeholder={LangMessages.auth.enterEmail} />
    </div>
  );
}
```

### Exemple complet : Page Login

```jsx
import { LangMessages } from "../../lang/lang";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/assets/images/logo.svg"
          alt={LangMessages.application.appName}
        />
        <h3>{LangMessages.auth.login}</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="email">
              {LangMessages.auth.email}
            </label>
            <input
              type="email"
              id="email"
              placeholder={LangMessages.auth.enterEmail}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              {LangMessages.auth.password}
            </label>
            <input
              type="password"
              id="password"
              placeholder={LangMessages.auth.enterPassword}
            />
          </div>

          <UICheckbox
            id="remember"
            label={LangMessages.auth.rememberMe}
          />

          <a onClick={handleForgotPassword}>
            {LangMessages.auth.forgotPassword}
          </a>

          <UIButton
            type="submit"
            label={LangMessages.auth.login}
          />

          <p>
            {LangMessages.auth.dontHaveAccount}{" "}
            <a onClick={handleSignup}>
              {LangMessages.auth.signup}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

## Catégories de messages

### application

Informations générales sur l'application.

```javascript
LangMessages.application.appName        // "ITam"
LangMessages.application.appSlogon      // "IT Assets Manager"
```

### auth

Messages liés à l'authentification.

```javascript
LangMessages.auth.login                 // "Login"
LangMessages.auth.signup                // "Sign up"
LangMessages.auth.email                 // "Email address"
LangMessages.auth.password              // "Password"
LangMessages.auth.rememberMe            // "Remember me"
LangMessages.auth.forgotPassword        // "Forgot password?"
LangMessages.auth.logout                // "Log out"
// ... etc
```

### user

Messages liés au profil utilisateur.

```javascript
LangMessages.user.profil                // "Profil"
LangMessages.user.help                  // "Help!"
LangMessages.user.notification          // "Notification"
LangMessages.user.notifications         // "Notifications"
```

## Extension du système

### Ajouter une nouvelle catégorie

```javascript
// lang.js
export const LangMessages = {
  currentLanguage: "en",

  // ... catégories existantes ...

  // Nouvelle catégorie : Assets
  assets: {
    title: "Assets",
    list: "Asset List",
    add: "Add Asset",
    edit: "Edit Asset",
    delete: "Delete Asset",
    name: "Asset Name",
    type: "Asset Type",
    status: "Status",
    assignedTo: "Assigned To",
  },
};
```

### Ajouter des messages à une catégorie existante

```javascript
auth: {
  // Messages existants...
  login: "Login",
  signup: "Sign up",

  // Nouveaux messages
  emailRequired: "Email is required",
  passwordRequired: "Password is required",
  invalidCredentials: "Invalid email or password",
  accountCreated: "Account created successfully",
},
```

## Système multilingue avancé

### Structure recommandée pour plusieurs langues

#### Étape 1 : Créer des fichiers de langue séparés

```
src/lang/
├── index.js          # Export et gestion de la langue
├── en.js            # Anglais
├── fr.js            # Français
└── es.js            # Espagnol
```

#### Étape 2 : Fichiers de traduction

**src/lang/en.js**
```javascript
export const en = {
  application: {
    appName: "ITam",
    appSlogon: "IT Assets Manager",
  },
  auth: {
    login: "Login",
    email: "Email address",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
  },
  // ...
};
```

**src/lang/fr.js**
```javascript
export const fr = {
  application: {
    appName: "ITam",
    appSlogon: "Gestionnaire d'actifs informatiques",
  },
  auth: {
    login: "Connexion",
    email: "Adresse email",
    password: "Mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
  },
  // ...
};
```

**src/lang/es.js**
```javascript
export const es = {
  application: {
    appName: "ITam",
    appSlogon: "Gestor de activos informáticos",
  },
  auth: {
    login: "Iniciar sesión",
    email: "Correo electrónico",
    password: "Contraseña",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
  },
  // ...
};
```

#### Étape 3 : Gestionnaire de langue

**src/lang/index.js**
```javascript
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

const translations = { en, fr, es };

// Récupérer la langue depuis localStorage ou défaut
const getInitialLanguage = () => {
  const saved = localStorage.getItem("language");
  return saved && translations[saved] ? saved : "en";
};

let currentLanguage = getInitialLanguage();

export const LangMessages = translations[currentLanguage];

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem("language", lang);
    window.location.reload(); // Recharger pour appliquer
  }
};

export const getCurrentLanguage = () => currentLanguage;

export const getAvailableLanguages = () => Object.keys(translations);
```

#### Étape 4 : Context API pour la langue (React)

**src/context/LanguageContext.jsx**
```jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { en } from "../lang/en";
import { fr } from "../lang/fr";
import { es } from "../lang/es";

const translations = { en, fr, es };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const messages = translations[language];

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, messages, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
```

#### Étape 5 : Wrapper l'application

**src/main.jsx**
```jsx
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
```

#### Étape 6 : Utilisation dans les composants

```jsx
import { useLanguage } from "../context/LanguageContext";

function Login() {
  const { messages } = useLanguage();

  return (
    <div>
      <h3>{messages.auth.login}</h3>
      <label>{messages.auth.email}</label>
      <input placeholder={messages.auth.enterEmail} />
    </div>
  );
}
```

#### Étape 7 : Sélecteur de langue

```jsx
import { useLanguage } from "../context/LanguageContext";

function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
    </select>
  );
}
```

## Bonnes pratiques

### 1. Organisation des clés

```javascript
// ✅ Bon : Organisation claire par fonctionnalité
auth: {
  login: "Login",
  email: "Email",
  password: "Password",
}

// ❌ Mauvais : Clés désorganisées
messages: {
  msg1: "Login",
  msg2: "Email",
  someOtherThing: "Password",
}
```

### 2. Nommage des clés

```javascript
// ✅ Bon : Noms descriptifs en camelCase
auth: {
  forgotPassword: "Forgot password?",
  rememberMe: "Remember me",
  dontHaveAccount: "Don't have an account?",
}

// ❌ Mauvais : Noms courts ou cryptiques
auth: {
  fp: "Forgot password?",
  rm: "Remember me",
  q1: "Don't have an account?",
}
```

### 3. Éviter le hardcoding

```jsx
// ✅ Bon : Utiliser LangMessages
<h1>{LangMessages.application.appName}</h1>
<button>{LangMessages.auth.login}</button>

// ❌ Mauvais : Texte hardcodé
<h1>ITam</h1>
<button>Login</button>
```

### 4. Pluralisation

Pour gérer les pluriels :

```javascript
user: {
  notification: "Notification",
  notifications: "Notifications",
}

// Utilisation
const count = 5;
const label = count === 1
  ? LangMessages.user.notification
  : LangMessages.user.notifications;
```

### 5. Variables dans les messages

Pour les messages avec variables :

```javascript
// Approche simple
messages: {
  welcome: (name) => `Welcome, ${name}!`,
  itemsCount: (count) => `You have ${count} items`,
}

// Utilisation
<h1>{LangMessages.messages.welcome("John")}</h1>
```

## Formatage de dates et nombres

### Dates

```javascript
// Fonction helper
const formatDate = (date, language) => {
  return new Intl.DateTimeFormat(language).format(date);
};

// Utilisation
const formatted = formatDate(new Date(), "fr-FR"); // "06/12/2025"
const formatted = formatDate(new Date(), "en-US"); // "12/6/2025"
```

### Nombres

```javascript
// Fonction helper
const formatNumber = (number, language) => {
  return new Intl.NumberFormat(language).format(number);
};

// Utilisation
formatNumber(1234.56, "fr-FR"); // "1 234,56"
formatNumber(1234.56, "en-US"); // "1,234.56"
```

### Devises

```javascript
const formatCurrency = (amount, language, currency) => {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

// Utilisation
formatCurrency(1234.56, "fr-FR", "EUR"); // "1 234,56 €"
formatCurrency(1234.56, "en-US", "USD"); // "$1,234.56"
```

## Messages d'erreur

### Structure pour erreurs

```javascript
errors: {
  // Erreurs de validation
  required: "This field is required",
  invalidEmail: "Please enter a valid email",
  passwordTooShort: "Password must be at least 8 characters",
  passwordMismatch: "Passwords do not match",

  // Erreurs API
  networkError: "Network error, please try again",
  serverError: "Server error, please contact support",
  unauthorized: "You are not authorized to perform this action",
  notFound: "Resource not found",

  // Erreurs métier
  assetNotAvailable: "This asset is not available",
  assignmentFailed: "Assignment failed, please try again",
},
```

### Utilisation

```jsx
function LoginForm() {
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      await login();
    } catch (err) {
      setError(LangMessages.errors.unauthorized);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* ... */}
    </form>
  );
}
```

## Messages de succès

```javascript
success: {
  loginSuccess: "Login successful",
  accountCreated: "Account created successfully",
  assetAdded: "Asset added successfully",
  assetUpdated: "Asset updated successfully",
  assetDeleted: "Asset deleted successfully",
  assignmentCreated: "Assignment created successfully",
},
```

## Validation de complétude

### Script pour vérifier les traductions manquantes

```javascript
// scripts/checkTranslations.js
import { en } from "./src/lang/en.js";
import { fr } from "./src/lang/fr.js";

function getAllKeys(obj, prefix = "") {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getAllKeys(en);
const frKeys = getAllKeys(fr);

const missing = enKeys.filter(key => !frKeys.includes(key));

if (missing.length > 0) {
  console.log("Missing translations in FR:");
  missing.forEach(key => console.log(`- ${key}`));
} else {
  console.log("All translations complete!");
}
```

## Ressources

### Outils recommandés

- [i18next](https://www.i18next.com/) - Bibliothèque i18n complète (pour upgrade futur)
- [react-i18next](https://react.i18next.com/) - Intégration React
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) - API native de formatage

### Standards

- [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) - Codes de langue
- [BCP 47](https://tools.ietf.org/html/bcp47) - Tags de langue

## Conclusion

Le système actuel est :
- **Simple** : Objet JavaScript facile à maintenir
- **Extensible** : Prêt pour ajout de langues
- **Performant** : Pas de bibliothèque externe
- **Type-safe** : Autocomplete avec les imports

Pour une application plus complexe avec beaucoup de langues, envisager une migration vers i18next.

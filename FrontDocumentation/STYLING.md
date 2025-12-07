# Guide de styling - ITam

Documentation complète du système de styling et des conventions CSS du projet.

## Vue d'ensemble

Le projet ITam utilise une approche hybride combinant Bootstrap 5.3 pour les composants de base et les utilitaires, avec du CSS personnalisé pour les styles spécifiques.

## Stack CSS

### Bootstrap 5.3.8

Framework CSS principal pour :
- Grille responsive
- Composants UI
- Classes utilitaires
- Normalisation cross-browser

**Import** : Dans `src/main.jsx`
```jsx
import "bootstrap/dist/css/bootstrap.min.css";
```

### CSS personnalisé

Fichiers CSS scopés par composant :
- `App.css` : Styles globaux
- `ComponentName.css` : Styles spécifiques au composant

## Organisation des fichiers CSS

```
src/
├── App.css                          # Styles globaux
├── components/
│   └── uiHTMLElements/
│       ├── UIButton.css            # Styles du bouton
│       └── UICheckbox.css          # Styles du checkbox
└── pages/
    └── auth/
        └── Login.css               # Styles de la page Login
```

### Principe : Un composant = Un fichier CSS

```jsx
// UIButton.jsx
import "./UIButton.css";

function UIButton() {
  return <button className="btn">Click</button>;
}
```

## Bootstrap : Utilisation

### Système de grille

```jsx
<div className="container">
  <div className="row">
    <div className="col-md-6">Colonne 1</div>
    <div className="col-md-6">Colonne 2</div>
  </div>
</div>
```

#### Breakpoints
- `xs` : < 576px
- `sm` : ≥ 576px
- `md` : ≥ 768px
- `lg` : ≥ 992px
- `xl` : ≥ 1200px
- `xxl` : ≥ 1400px

### Classes utilitaires

#### Spacing (margin/padding)

```jsx
className="m-0"    // margin: 0
className="m-1"    // margin: 0.25rem
className="m-2"    // margin: 0.5rem
className="m-3"    // margin: 1rem
className="m-4"    // margin: 1.5rem
className="m-5"    // margin: 3rem

// Directions spécifiques
className="mt-3"   // margin-top
className="mb-3"   // margin-bottom
className="ms-3"   // margin-start (left en LTR)
className="me-3"   // margin-end (right en LTR)
className="mx-3"   // margin horizontal
className="my-3"   // margin vertical

// Padding (même syntaxe avec p)
className="p-4"
className="pt-2"
className="px-3"
```

#### Flexbox

```jsx
// Container flex
className="d-flex"

// Direction
className="flex-row"          // row (défaut)
className="flex-column"       // column

// Justify content
className="justify-content-start"
className="justify-content-center"
className="justify-content-end"
className="justify-content-between"
className="justify-content-around"

// Align items
className="align-items-start"
className="align-items-center"
className="align-items-end"

// Gap (espacement entre éléments)
className="gap-1"    // 0.25rem
className="gap-2"    // 0.5rem
className="gap-3"    // 1rem
```

**Exemple utilisé dans UIButton :**
```jsx
className="btn d-flex align-items-center justify-content-center gap-2"
```

#### Texte

```jsx
// Alignement
className="text-start"
className="text-center"
className="text-end"

// Couleurs
className="text-primary"
className="text-secondary"
className="text-danger"
className="text-success"
className="text-warning"
className="text-muted"

// Taille et poids
className="fs-1"         // Font size 1 (plus grand)
className="fs-6"         // Font size 6 (plus petit)
className="fw-bold"      // Font weight bold
className="fw-normal"    // Font weight normal
className="fst-italic"   // Font style italic

// Décoration
className="text-decoration-none"   // Pas de soulignement
className="text-decoration-underline"
```

#### Display et visibilité

```jsx
className="d-none"           // display: none
className="d-block"          // display: block
className="d-inline-block"   // display: inline-block
className="d-flex"           // display: flex

// Responsive
className="d-none d-md-block"  // Caché sur mobile, visible sur desktop
```

#### Dimensions

```jsx
className="w-100"     // width: 100%
className="w-50"      // width: 50%
className="w-25"      // width: 25%
className="h-100"     // height: 100%

// Min/Max
className="mw-100"    // max-width: 100%
className="vh-100"    // height: 100vh
```

### Composants Bootstrap

#### Boutons

```jsx
// Variantes
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-danger">Danger</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-info">Info</button>
<button className="btn btn-light">Light</button>
<button className="btn btn-dark">Dark</button>
<button className="btn btn-link">Link</button>

// Outline
<button className="btn btn-outline-primary">Outline</button>

// Tailles
<button className="btn btn-sm">Petit</button>
<button className="btn btn-lg">Grand</button>
```

#### Formulaires

```jsx
// Input
<div className="mb-3">
  <label className="form-label" htmlFor="email">Email</label>
  <input
    type="email"
    id="email"
    className="form-control"
    placeholder="Enter email"
  />
</div>

// Checkbox
<div className="form-check">
  <input className="form-check-input" type="checkbox" id="check1" />
  <label className="form-check-label" htmlFor="check1">
    Remember me
  </label>
</div>

// Select
<select className="form-select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

#### Cards

```jsx
<div className="card">
  <div className="card-header">Header</div>
  <div className="card-body">
    <h5 className="card-title">Title</h5>
    <p className="card-text">Content</p>
  </div>
  <div className="card-footer">Footer</div>
</div>
```

#### Spinners (Loading)

```jsx
// Spinner border (utilisé dans UIButton)
<span className="spinner-border spinner-border-sm" role="status" />

// Spinner grow
<span className="spinner-grow spinner-grow-sm" />
```

## CSS personnalisé

### Exemple : Login.css

```css
/* Page Login : styles spécifiques */
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  max-width: 400px;
  width: 100%;
}

.login-logo {
  max-width: 200px;
  margin: 0 auto;
  display: block;
}

.loginHeader {
  margin-bottom: 1.5rem;
}
```

### Exemple : UIButton.css

```css
/* Composant UIButton : styles du bouton */
.btn {
  /* Styles Bootstrap override si nécessaire */
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.ui-btn-label {
  font-weight: 500;
}
```

### Exemple : UICheckbox.css

```css
/* Checkbox normale */
.checkbox {
  cursor: pointer;
  width: 18px;
  height: 18px;
}

/* Checkbox style "delete" (rouge) */
.checkbox-delete {
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: #dc3545; /* Rouge danger Bootstrap */
}

.checkbox:disabled,
.checkbox-delete:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

## Conventions de nommage CSS

### BEM (Block Element Modifier) - Recommandé

```css
/* Block */
.card {}

/* Element */
.card__header {}
.card__body {}
.card__footer {}

/* Modifier */
.card--highlighted {}
.card__header--large {}
```

### Préfixes pour scopes

```css
/* Composant UI */
.ui-button {}
.ui-checkbox {}

/* Page */
.login-container {}
.dashboard-card {}

/* Layout */
.layout-header {}
.layout-sidebar {}
```

## Variables CSS (Custom Properties)

### Définition des variables

```css
:root {
  /* Couleurs */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --danger-color: #dc3545;
  --success-color: #28a745;

  /* Espacements */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;

  /* Typographie */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;

  /* Transitions */
  --transition-speed: 0.3s;

  /* Ombres */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Utilisation

```css
.my-component {
  color: var(--primary-color);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-speed) ease;
}
```

## Thème sombre (préparation)

### Structure pour thème sombre

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

### Toggle thème (React)

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

## Responsive design

### Mobile-first approach

```css
/* Mobile (défaut) */
.container {
  padding: 1rem;
}

/* Tablet et plus */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .container {
    padding: 3rem;
    max-width: 1140px;
  }
}
```

### Classes Bootstrap responsive

```jsx
// Affichage conditionnel
className="d-none d-md-block"        // Caché mobile, visible desktop
className="d-block d-md-none"        // Visible mobile, caché desktop

// Colonnes responsive
className="col-12 col-md-6 col-lg-4" // 100% mobile, 50% tablet, 33% desktop
```

## Animations et transitions

### Transitions CSS

```css
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
```

### Animations CSS

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease;
}
```

### Utilisation dans React

```jsx
function AnimatedComponent() {
  const [show, setShow] = useState(false);

  return (
    <div className={show ? "fade-in" : ""}>
      Content
    </div>
  );
}
```

## Bonnes pratiques

### 1. Préférer Bootstrap quand possible

```css
/* ✅ Bon : Utiliser Bootstrap */
<div className="d-flex justify-content-center align-items-center">

/* ❌ Éviter : CSS custom pour des choses standards */
<div style={{ display: "flex", justifyContent: "center" }}>
```

### 2. Scoper les styles personnalisés

```css
/* ✅ Bon : Préfixe spécifique */
.login-container { }
.login-box { }

/* ❌ Mauvais : Noms génériques */
.container { }
.box { }
```

### 3. Éviter les styles inline

```jsx
/* ✅ Bon : Classes CSS */
<div className="login-container">

/* ❌ Mauvais : Styles inline */
<div style={{ minHeight: "100vh", background: "linear-gradient..." }}>
```

### 4. Organiser les classes

```jsx
/* ✅ Bon : Ordre logique */
className="btn btn-primary w-100 mt-3"
// 1. Composant de base (btn)
// 2. Variante (btn-primary)
// 3. Dimensions (w-100)
// 4. Espacement (mt-3)

/* ❌ Mauvais : Désorganisé */
className="mt-3 w-100 btn-primary btn"
```

### 5. Commentaires CSS

```css
/* ========== Login Page ========== */

/* Container principal */
.login-container {
  /* ... */
}

/* Boîte de connexion */
.login-box {
  /* ... */
}
```

## Accessibilité

### Focus visible

```css
.btn:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

### Contraste des couleurs

```css
/* ✅ Bon : Contraste suffisant */
.text-on-dark {
  color: #ffffff;
  background: #333333;
}

/* ❌ Mauvais : Contraste faible */
.text-on-light {
  color: #cccccc;
  background: #ffffff;
}
```

### Tailles de texte

```css
/* Minimum 16px pour le corps du texte */
body {
  font-size: 1rem; /* 16px */
}

/* Jamais moins de 14px */
.small-text {
  font-size: 0.875rem; /* 14px */
}
```

## Performance

### Éviter les sélecteurs complexes

```css
/* ✅ Bon : Sélecteur simple */
.card-title { }

/* ❌ Mauvais : Trop complexe */
div.container > div.row > div.col > div.card > div.card-body > h5.card-title { }
```

### Utiliser les classes plutôt que les IDs

```css
/* ✅ Bon : Classe réutilisable */
.login-box { }

/* ❌ Éviter : ID non réutilisable */
#loginBox { }
```

## Ressources

### Documentation Bootstrap
- [Bootstrap 5.3 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Cheatsheet](https://getbootstrap.com/docs/5.3/examples/cheatsheet/)

### Outils
- [CSS Variables Generator](https://www.cssportal.com/css-variables-generator/)
- [Gradient Generator](https://cssgradient.io/)
- [Box Shadow Generator](https://cssgenerator.org/box-shadow-css-generator.html)

### Validation
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Exemples complets

### Page Login complète

```jsx
// Login.jsx
<div className="d-flex justify-content-center align-items-center login-container">
  <div className="p-4 shadow rounded login-box">
    <div className="loginHeader">
      <img src="/logo.svg" alt="Logo" className="login-logo" />
      <h3 className="text-center mb-4">Connexion</h3>
    </div>

    <form>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" />
      </div>

      <UIButton
        type="submit"
        className="btn-primary w-100"
        label="Se connecter"
      />
    </form>
  </div>
</div>
```

```css
/* Login.css */
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  max-width: 400px;
  width: 100%;
}

.login-logo {
  max-width: 200px;
  margin: 0 auto;
  display: block;
}
```

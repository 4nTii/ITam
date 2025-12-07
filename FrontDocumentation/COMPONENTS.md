# Documentation des composants - ITam

Guide complet des composants UI réutilisables disponibles dans le projet.

## Vue d'ensemble

Les composants UI sont situés dans `src/components/uiHTMLElements/` et sont conçus pour être génériques, réutilisables et cohérents dans toute l'application.

## Composants disponibles

### UIButton

Composant bouton générique et réutilisable pour l'ensemble du projet.

#### Localisation
- **Fichier** : `src/components/uiHTMLElements/UIButton.jsx`
- **Styles** : `src/components/uiHTMLElements/UIButton.css`

#### Props

| Prop | Type | Défaut | Requis | Description |
|------|------|--------|--------|-------------|
| `id` | `string` | `""` | ✅ | Identifiant unique du bouton |
| `label` | `string` | `"Button"` | ❌ | Texte affiché dans le bouton |
| `onClick` | `function` | - | ❌ | Fonction appelée au clic |
| `type` | `string` | `"button"` | ❌ | Type HTML du bouton (`"button"`, `"submit"`, `"reset"`) |
| `className` | `string` | `""` | ❌ | Classes CSS supplémentaires (Bootstrap ou custom) |
| `disabled` | `boolean` | `false` | ❌ | Désactive le bouton |
| `loading` | `boolean` | `false` | ❌ | Affiche un spinner et désactive le bouton |

#### Exemples d'utilisation

##### Bouton simple
```jsx
import UIButton from '../components/uiHTMLElements/UIButton';

<UIButton
  id="submit-btn"
  label="Envoyer"
  onClick={handleSubmit}
/>
```

##### Bouton avec style Bootstrap
```jsx
<UIButton
  id="login-btn"
  label="Se connecter"
  type="submit"
  className="btn-primary w-100"
  onClick={handleLogin}
/>
```

##### Bouton avec état de chargement
```jsx
const [isLoading, setIsLoading] = useState(false);

<UIButton
  id="save-btn"
  label="Sauvegarder"
  loading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  }}
/>
```

##### Bouton désactivé
```jsx
<UIButton
  id="disabled-btn"
  label="Non disponible"
  disabled={true}
  className="btn-secondary"
/>
```

#### Classes CSS disponibles

Le composant utilise Bootstrap pour le styling de base :

```jsx
// Styles de boutons Bootstrap
className="btn-primary"      // Bouton bleu primaire
className="btn-secondary"    // Bouton gris secondaire
className="btn-danger"       // Bouton rouge danger
className="btn-success"      // Bouton vert succès
className="btn-warning"      // Bouton jaune avertissement
className="btn-info"         // Bouton cyan info
className="btn-light"        // Bouton clair
className="btn-dark"         // Bouton sombre

// Tailles
className="btn-sm"           // Petit
className="btn-lg"           // Grand

// Largeur
className="w-100"            // 100% de largeur

// Combinaisons
className="btn-primary w-100 btn-lg"
```

#### Structure du composant

```jsx
<button className="btn d-flex align-items-center justify-content-center gap-2">
  {/* Spinner si loading=true */}
  <span className="spinner-border spinner-border-sm" />

  {/* Label */}
  <span className="ui-btn-label">{label}</span>
</button>
```

#### Comportement

- **État de chargement** : Quand `loading={true}`, affiche un spinner et désactive automatiquement le bouton
- **Désactivation** : Quand `disabled={true}` ou `loading={true}`, le bouton est désactivé
- **Flexbox** : Le contenu est centré avec flexbox et un espacement de 2 unités Bootstrap

---

### UICheckbox

Composant checkbox réutilisable avec support de deux modes : single et multi-choice.

#### Localisation
- **Fichier** : `src/components/uiHTMLElements/UICheckbox.jsx`
- **Styles** : `src/components/uiHTMLElements/UICheckbox.css`

#### Props

| Prop | Type | Défaut | Requis | Description |
|------|------|--------|--------|-------------|
| `id` | `string` | `""` | ✅ | Identifiant unique de la checkbox |
| `name` | `string` | - | ❌ | Attribut name HTML (pour formulaires) |
| `checked` | `boolean` | `false` | ❌ | État coché (mode single) |
| `value` | `string` | - | ❌ | Valeur de la checkbox (requis en mode multi) |
| `selectedValues` | `string[]` | `null` | ❌ | Tableau des valeurs sélectionnées (mode multi) |
| `label` | `string` | `"Checkbox"` | ❌ | Texte du label |
| `deleteStyle` | `boolean` | `false` | ❌ | Applique le style "delete" (rouge) |
| `onChange` | `function` | - | ✅ | Callback lors du changement d'état |
| `disabled` | `boolean` | `false` | ❌ | Désactive la checkbox |
| `className` | `string` | `""` | ❌ | Classes CSS supplémentaires pour le label |

#### Modes de fonctionnement

##### Mode 1 : Single-checkbox (état simple)

Utilisez `checked` pour gérer l'état. Le `onChange` reçoit l'événement natif.

**Exemple :**
```jsx
import UICheckbox from '../components/uiHTMLElements/UICheckbox';
import { useState } from 'react';

function Example() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <UICheckbox
      id="remember-me"
      checked={rememberMe}
      label="Se souvenir de moi"
      onChange={handleChange}
    />
  );
}
```

##### Mode 2 : Multi-choice (sélections multiples)

Utilisez `selectedValues` (array) et `value` (string). Le `onChange` reçoit le tableau mis à jour.

**Exemple :**
```jsx
function MultiChoiceExample() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div>
      <UICheckbox
        id="option1"
        value="option1"
        selectedValues={selectedOptions}
        label="Option 1"
        onChange={setSelectedOptions}
      />

      <UICheckbox
        id="option2"
        value="option2"
        selectedValues={selectedOptions}
        label="Option 2"
        onChange={setSelectedOptions}
      />

      <UICheckbox
        id="option3"
        value="option3"
        selectedValues={selectedOptions}
        label="Option 3"
        onChange={setSelectedOptions}
      />

      <p>Sélectionnés : {selectedOptions.join(', ')}</p>
    </div>
  );
}
```

#### Exemples avancés

##### Checkbox avec style "delete"
```jsx
<UICheckbox
  id="delete-item"
  checked={toDelete}
  label="Supprimer cet élément"
  deleteStyle={true}
  onChange={(e) => setToDelete(e.target.checked)}
/>
```

##### Checkbox désactivée
```jsx
<UICheckbox
  id="disabled-checkbox"
  checked={true}
  label="Option non modifiable"
  disabled={true}
  onChange={() => {}}
/>
```

##### Checkbox avec classe personnalisée
```jsx
<UICheckbox
  id="custom-checkbox"
  checked={accepted}
  label="J'accepte les conditions"
  className="text-danger fw-bold"
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

#### Structure du composant

```jsx
<div className="m-2">
  <input
    type="checkbox"
    id={id}
    className={deleteStyle ? "checkbox-delete" : "checkbox"}
    checked={isChecked}
    onChange={handleChange}
    disabled={disabled}
  />
  <label htmlFor={id} className={`ms-1 ${className}`}>
    {label}
  </label>
</div>
```

#### Comportement interne

Le composant gère automatiquement :

1. **Détection du mode** :
   - Si `selectedValues` est fourni → mode multi-choice
   - Sinon → mode single

2. **Calcul de l'état coché** :
   ```javascript
   const isChecked = selectedValues
     ? selectedValues.includes(value)  // multi-choice
     : checked;                         // single
   ```

3. **Gestion du onChange** :
   - **Mode multi** : retourne le nouveau tableau avec la valeur ajoutée/retirée
   - **Mode single** : retourne l'événement natif

---

## Bonnes pratiques

### Utilisation des composants UI

1. **Toujours spécifier un `id` unique**
   ```jsx
   // ✅ Bon
   <UIButton id="submit-form" label="Envoyer" />

   // ❌ Mauvais
   <UIButton label="Envoyer" />
   ```

2. **Utiliser les classes Bootstrap pour la cohérence**
   ```jsx
   // ✅ Bon
   <UIButton className="btn-primary w-100" />

   // ❌ Éviter les styles inline
   <UIButton style={{ width: '100%', backgroundColor: 'blue' }} />
   ```

3. **Gérer les états de chargement**
   ```jsx
   // ✅ Bon
   const [loading, setLoading] = useState(false);
   <UIButton loading={loading} onClick={asyncAction} />

   // ❌ Mauvais (pas de feedback visuel)
   <UIButton onClick={asyncAction} />
   ```

4. **Valider avec PropTypes**
   ```jsx
   // Les composants utilisent déjà PropTypes
   // Vérifier les warnings dans la console en dev
   ```

### Internationalisation

Toujours utiliser `LangMessages` pour les labels :

```jsx
import { LangMessages } from '../../lang/lang';

<UIButton
  id="login-btn"
  label={LangMessages.auth.login}  // ✅ Bon
/>

// ❌ Éviter le hardcode
<UIButton label="Se connecter" />
```

### Performance

Les composants UI sont légers, mais pour des listes :

```jsx
// ✅ Bon : key unique
{items.map(item => (
  <UICheckbox
    key={item.id}
    id={item.id}
    value={item.id}
    label={item.name}
  />
))}

// ❌ Mauvais : index comme key
{items.map((item, index) => (
  <UICheckbox key={index} ... />
))}
```

## Créer un nouveau composant UI

### Template de composant

```jsx
import React from "react";
import PropTypes from "prop-types";
import "./MonComposant.css";

/**
 * MonComposant - Description courte
 *
 * Description détaillée du composant
 *
 * @param {string} id - Identifiant unique
 * @param {string} label - Label du composant
 * @param {function} onChange - Callback de changement
 */
export default function MonComposant({
  id = "",
  label = "Default",
  onChange,
  className = "",
}) {
  const handleChange = (e) => {
    onChange && onChange(e);
  };

  return (
    <div className={`mon-composant ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        onChange={handleChange}
      />
    </div>
  );
}

MonComposant.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
```

### Checklist pour nouveau composant

- [ ] Créer `MonComposant.jsx` dans `src/components/uiHTMLElements/`
- [ ] Créer `MonComposant.css` pour les styles
- [ ] Ajouter PropTypes pour validation
- [ ] Documenter avec JSDoc
- [ ] Tester dans une page
- [ ] Ajouter à cette documentation

## Composants à venir

### Prévisions futures

- **UIInput** : Input text générique
- **UISelect** : Dropdown/select
- **UIModal** : Modale réutilisable
- **UIAlert** : Notifications/alertes
- **UICard** : Carte avec header/body/footer
- **UITable** : Tableau avec tri/pagination
- **UIBadge** : Badges et tags
- **UISpinner** : Indicateur de chargement standalone
- **UITooltip** : Info-bulles
- **UIDropdown** : Menu déroulant

## Support et questions

Pour toute question sur les composants :
1. Consulter le code source du composant
2. Vérifier les exemples ci-dessus
3. Tester dans un environnement de dev
4. Contacter l'équipe si besoin

## Références

- [React Props Documentation](https://react.dev/learn/passing-props-to-a-component)
- [PropTypes Documentation](https://www.npmjs.com/package/prop-types)
- [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/)

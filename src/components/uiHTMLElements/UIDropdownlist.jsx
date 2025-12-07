import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./UIDropdownlist.css";
import { LangMessages } from "../../lang/lang";

/**
 * UIDropdownlist — composant de liste déroulante réutilisable
 *
 * Props :
 * @param {string} id - Identifiant unique (requis)
 * @param {Array} options - Tableau d'options [{value: string, label: string}] (requis)
 * @param {string} [value=""] - Valeur sélectionnée
 * @param {function} onChange - Callback appelé lors du changement (reçoit la valeur sélectionnée)
 * @param {boolean} [filterInput=false] - Si true, affiche un input de filtrage dans la liste
 * @param {string} [placeholder="Select an option"] - Texte placeholder
 * @param {boolean} [disabled=false] - Désactive le dropdown
 * @param {string} [className=""] - Classes CSS additionnelles
 * @param {string} [name=""] - Attribut name pour les formulaires
 * @param {string} [label=""] - Label optionnel affiché au-dessus du dropdown
 * @param {string} [filterPlaceholder="Search..."] - Placeholder pour l'input de filtrage
 * __________
 * @returns HTML UI Dropdownlist
 */
export default function UIDropdownlist({
  id,
  options = [],
  value = "",
  onChange,
  filterInput = false,
  placeholder = LangMessages.uiComponents.dropdown.selectOption,
  disabled = false,
  className = "",
  name = "",
  label = "",
  filterPlaceholder = LangMessages.uiComponents.dropdown.search,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const dropdownRef = useRef(null);
  const filterInputRef = useRef(null);

  // Filtrer les options en fonction du texte de recherche
  const filteredOptions = filterInput
    ? options.filter((option) =>
        option.label.toLowerCase().includes(filterText.toLowerCase())
      )
    : options;

  // Trouver le label de la valeur sélectionnée
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFilterText("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus sur l'input de filtrage quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && filterInput && filterInputRef.current) {
      filterInputRef.current.focus();
    }
  }, [isOpen, filterInput]);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Sélectionner une option
  const handleSelectOption = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setFilterText("");
  };

  // Si filterInput est false, utiliser un select natif
  if (!filterInput) {
    return (
      <div className={`ui-dropdown-container ${className}`}>
        {label && (
          <label htmlFor={id} className="ui-dropdown-label">
            {label}
          </label>
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={disabled}
          className="ui-dropdown-select"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Si filterInput est true, utiliser un dropdown personnalisé
  return (
    <div className={`ui-dropdown-container ${className}`} ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className="ui-dropdown-label">
          {label}
        </label>
      )}
      <div
        className={`ui-dropdown-custom ${disabled ? "disabled" : ""} ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleDropdown}
      >
        <div className="ui-dropdown-selected">
          <span className={!value ? "ui-dropdown-placeholder" : ""}>{displayText}</span>
          <span className={`ui-dropdown-arrow ${isOpen ? "open" : ""}`}>
            ▼
          </span>
        </div>

        {isOpen && (
          <div className="ui-dropdown-menu">
            {filterInput && (
              <div className="ui-dropdown-filter">
                <input
                  ref={filterInputRef}
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={filterPlaceholder}
                  className="ui-dropdown-filter-input"
                />
              </div>
            )}
            <div className="ui-dropdown-options">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`ui-dropdown-option ${
                      option.value === value ? "selected" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectOption(option.value);
                    }}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="ui-dropdown-no-results">{LangMessages.uiComponents.dropdown.noResults}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

UIDropdownlist.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  filterInput: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  filterPlaceholder: PropTypes.string,
};

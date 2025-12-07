import React from "react";
import PropTypes from "prop-types";
import "./MainMenu.css";
import { LangMessages } from "../../lang/lang";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * MainMenu — Menu principal de navigation
 *
 * Props :
 * @param {Array} menuItems - Tableau d'objets menu [{label: string, path: string, icon?: string}]
 * @param {string} [className=""] - Classes CSS additionnelles
 * __________
 * @returns HTML Main Menu
 */
export default function MainMenu({ menuItems = [], className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Menu par défaut si aucun menu n'est fourni
  const defaultMenuItems = [
    { label: LangMessages.navigation.dashboard, path: "/", icon: "📊" },
    { label: LangMessages.navigation.assets, path: "/assets", icon: "💼" },
    { label: LangMessages.navigation.eol, path: "/eol", icon: "⏳" },
    { label: LangMessages.navigation.statistiques, path: "/statistiques", icon: "📈" },
    { label: LangMessages.navigation.administration, path: "/administration", icon: "⚙️" },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  // Vérifier si l'item est actif
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Handle menu item click
  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <nav className={`main-menu ${className}`}>
      <ul className="menu-list">
        {items.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            onClick={() => handleMenuClick(item.path)}
          >
            {item.icon && <span className="menu-icon">{item.icon}</span>}
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

MainMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

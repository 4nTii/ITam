import React, { useState } from "react";
import PropTypes from "prop-types";
import "./LeftMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * LeftMenu — Menu latéral gauche avec sous-menus
 *
 * Props :
 * @param {Array} menuItems - Tableau d'objets menu avec sous-menus
 * @param {boolean} [defaultCollapsed=false] - État initial du menu (collapsed ou non)
 * @param {string} [className=""] - Classes CSS additionnelles
 * __________
 * @returns HTML Left Menu
 */
export default function LeftMenu({
  menuItems = [],
  defaultCollapsed = false,
  className = "",
}) {
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Check if path is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Handle menu item click
  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`left-menu ${className}`}>
      {/* Menu Content */}
      <div className="menu-content">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="menu-section">
            {/* Section Header */}
            <div
              className={`section-header ${
                expandedSections[sectionIndex] ? "expanded" : ""
              }`}
              onClick={() => toggleSection(sectionIndex)}
            >
              <span className="section-icon">{section.icon}</span>
              <span className="section-title">{section.title}</span>
              {section.subItems && section.subItems.length > 0 && (
                <span className="section-arrow">
                  {expandedSections[sectionIndex] ? "▼" : "▶"}
                </span>
              )}
            </div>

            {/* Sub Items */}
            {section.subItems &&
              section.subItems.length > 0 &&
              expandedSections[sectionIndex] && (
                <ul className="sub-items">
                  {section.subItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`sub-item ${
                        isActive(item.path) ? "active" : ""
                      }`}
                      onClick={() => handleItemClick(item.path)}
                    >
                      {item.icon && (
                        <span className="sub-item-icon">{item.icon}</span>
                      )}
                      <span className="sub-item-label">{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}

            {/* Direct link section (no subitems) */}
            {!section.subItems && section.path && (
              <div
                className={`section-link ${
                  isActive(section.path) ? "active" : ""
                }`}
                onClick={() => handleItemClick(section.path)}
              >
                {section.icon && (
                  <span className="section-icon">{section.icon}</span>
                )}
                <span className="section-title">{section.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

LeftMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      path: PropTypes.string,
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          icon: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  defaultCollapsed: PropTypes.bool,
  className: PropTypes.string,
};

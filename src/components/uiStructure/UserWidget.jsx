import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserWidget.css";
import { LangMessages } from "../../lang/lang";

/**
 * UserWidget — Widget utilisateur avec avatar et menu déroulant
 *
 * Props :
 * @param {string} userName - Nom de l'utilisateur à afficher
 * @param {string} [avatarUrl] - URL de l'avatar (optionnel)
 * @param {function} [onMyAccountClick] - Callback pour "My account"
 * @param {function} [onSettingsClick] - Callback pour "Settings"
 * @param {function} [onHelpClick] - Callback pour "Help!"
 * __________
 * @returns HTML User Widget
 */
export default function UserWidget({
  userName = "User",
  avatarUrl = null,
  onMyAccountClick,
  onSettingsClick,
  onHelpClick,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle menu item click
  const handleMenuItemClick = (callback) => {
    setIsDropdownOpen(false);
    if (callback) {
      callback();
    }
  };

  // Générer les initiales si pas d'avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="user-widget" ref={dropdownRef}>
      <div className="user-widget-trigger" onClick={toggleDropdown}>
        {/* Hello userName */}
        <span className="user-greeting">
          {LangMessages.user.hello} <strong>{userName}</strong>
        </span>

        {/* Avatar */}
        <div className="user-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">{getInitials(userName)}</div>
          )}
        </div>

        {/* Arrow indicator */}
        <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="user-dropdown-menu">
          <div
            className="user-dropdown-item"
            onClick={() => handleMenuItemClick(onMyAccountClick)}
          >
            <span className="dropdown-icon">👤</span>
            {LangMessages.user.myAccount}
          </div>
          <div
            className="user-dropdown-item"
            onClick={() => handleMenuItemClick(onSettingsClick)}
          >
            <span className="dropdown-icon">⚙️</span>
            {LangMessages.user.settings}
          </div>
          <div
            className="user-dropdown-item"
            onClick={() => handleMenuItemClick(onHelpClick)}
          >
            <span className="dropdown-icon">❓</span>
            {LangMessages.user.help}
          </div>
        </div>
      )}
    </div>
  );
}

UserWidget.propTypes = {
  userName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  onMyAccountClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
  onHelpClick: PropTypes.func,
};

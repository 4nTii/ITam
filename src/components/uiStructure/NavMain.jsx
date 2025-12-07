import React from "react";
import PropTypes from "prop-types";
import "./NavMain.css";
import MainMenu from "./MainMenu";
import UserWidget from "./UserWidget";
import { LangMessages } from "../../lang/lang";

/**
 * NavMain — Barre de navigation principale
 *
 * Props :
 * @param {string} [logoUrl] - URL du logo (optionnel)
 * @param {string} [logoAlt] - Texte alternatif pour le logo
 * @param {Array} [menuItems] - Items du menu principal
 * @param {string} userName - Nom de l'utilisateur
 * @param {string} [userAvatarUrl] - URL de l'avatar utilisateur
 * @param {function} [onLogoClick] - Callback au clic sur le logo
 * @param {function} [onMyAccountClick] - Callback pour "My account"
 * @param {function} [onSettingsClick] - Callback pour "Settings"
 * @param {function} [onHelpClick] - Callback pour "Help!"
 * @param {string} [className=""] - Classes CSS additionnelles
 * __________
 * @returns HTML Navigation Bar
 */
export default function NavMain({
  logoUrl = "/assets/images/itam_logo_uhd_svg.svg",
  logoAlt = LangMessages.application.appName,
  menuItems = [],
  userName = "User",
  userAvatarUrl = null,
  onLogoClick,
  onMyAccountClick,
  onSettingsClick,
  onHelpClick,
  className = "",
}) {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <nav className={`nav-main ${className}`}>
      <div className="nav-container">
        {/* Logo - Far Left */}
        <div className="nav-logo" onClick={handleLogoClick}>
          <img src={logoUrl} alt={logoAlt} className="logo-image" />
        </div>

        {/* Main Menu - Center */}
        <div className="nav-center">
          <MainMenu menuItems={menuItems} />
        </div>

        {/* User Widget - Far Right */}
        <div className="nav-right">
          <UserWidget
            userName={userName}
            avatarUrl={userAvatarUrl}
            onMyAccountClick={onMyAccountClick}
            onSettingsClick={onSettingsClick}
            onHelpClick={onHelpClick}
          />
        </div>
      </div>
    </nav>
  );
}

NavMain.propTypes = {
  logoUrl: PropTypes.string,
  logoAlt: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  userName: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string,
  onLogoClick: PropTypes.func,
  onMyAccountClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
  onHelpClick: PropTypes.func,
  className: PropTypes.string,
};

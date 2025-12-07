import React from "react";
import PropTypes from "prop-types";
import "./UIButton.css";
import { LangMessages } from "../../lang/lang";

/**
 * UIButton — bouton réutilisable et générique pour l'ensemble du projet
 *
 * Props :
 * - label : texte du bouton
 * - onClick : fonction appelée au clic
 * - variant : "primary", "secondary", "danger", "outline"
 * - size : "sm", "md", "lg"
 * - disabled : boolean
 * - loading : boolean (affiche un spinner)
 */
export default function UIButton({
  id = "",
  label = LangMessages.uiComponents.button.defaultLabel,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  const baseClass =
    "btn d-flex align-items-center justify-content-center gap-2";

  const handleClick = (event) => {
    onClick && onClick(event);
  };
  return (
    <button
      id={id}
      type={type}
      className={`${baseClass} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm" role="status" />
      )}

      {label && <span className="ui-btn-label">{label}</span>}
    </button>
  );
}

UIButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

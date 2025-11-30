import React from "react";
import PropTypes from "prop-types";

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
  label = "Button",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  const baseClass =
    "btn d-flex align-items-center justify-content-center gap-2";

  const variantClass = {
    primary: "btn-success text-white",
    secondary: "btn-secondary",
    danger: "btn-danger",
    outline: "btn-outline-success",
  }[variant];

  const sizeClass = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  }[size];

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
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
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

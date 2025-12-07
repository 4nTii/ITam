import React, { useState } from "react";
import PropTypes from "prop-types";
import "./UIImg.css";
import { LangMessages } from "../../lang/lang";

/**
 * UIImg — composant d'image réutilisable et générique
 *
 * Props :
 * @param {string} src - URL de l'image (requis)
 * @param {string} [alt="Image"] - Texte alternatif pour l'image
 * @param {string} [className=""] - Classes CSS additionnelles
 * @param {boolean} [clickable=false] - Si true, l'image est cliquable pour un affichage en grand
 * @param {string|number} [width] - Largeur de l'image
 * @param {string|number} [height] - Hauteur de l'image
 * @param {function} [onClick] - Fonction callback personnalisée au clic (si clickable est false)
 * @param {string} [id=""] - Identifiant unique pour l'image
 * @param {string} [objectFit="cover"] - CSS object-fit : "cover", "contain", "fill", "scale-down", "none"
 * @param {boolean} [rounded=false] - Si true, applique des coins arrondis
 * @param {boolean} [circle=false] - Si true, rend l'image circulaire
 * __________
 * @returns HTML UI Image
 */
export default function UIImg({
  src,
  alt = LangMessages.uiComponents.image.defaultAlt,
  className = "",
  clickable = false,
  width,
  height,
  onClick,
  id = "",
  objectFit = "cover",
  rounded = false,
  circle = false,
}) {
  const [showModal, setShowModal] = useState(false);

  // Classes CSS
  const baseClass = "ui-img";
  const clickableClass = clickable ? "ui-img-clickable" : "";
  const roundedClass = rounded ? "ui-img-rounded" : "";
  const circleClass = circle ? "ui-img-circle" : "";
  const combinedClass = `${baseClass} ${clickableClass} ${roundedClass} ${circleClass} ${className}`.trim();

  // Style inline
  const imgStyle = {
    width: width,
    height: height,
    objectFit: objectFit,
  };

  // Gestion du clic
  const handleClick = () => {
    if (clickable) {
      setShowModal(true);
    } else if (onClick) {
      onClick();
    }
  };

  // Fermeture de la modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <img
        id={id}
        src={src}
        alt={alt}
        className={combinedClass}
        style={imgStyle}
        onClick={handleClick}
      />

      {/* Modal pour affichage en grand */}
      {clickable && showModal && (
        <div className="ui-img-modal" onClick={handleCloseModal}>
          <div className="ui-img-modal-content">
            <span className="ui-img-modal-close" onClick={handleCloseModal}>
              &times;
            </span>
            <img
              src={src}
              alt={alt}
              className="ui-img-modal-image"
            />
          </div>
        </div>
      )}
    </>
  );
}

UIImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  id: PropTypes.string,
  objectFit: PropTypes.oneOf(["cover", "contain", "fill", "scale-down", "none"]),
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
};

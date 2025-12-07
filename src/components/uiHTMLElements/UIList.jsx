import React from "react";
import PropTypes from "prop-types";
import "./UIList.css";

/**
 * UIList — composant de liste réutilisable et générique
 *
 * Props :
 * @param {Array} items - Tableau d'éléments à afficher dans la liste (requis)
 * @param {string} [orientation="vertical"] - Orientation de la liste : "vertical" ou "horizontal"
 * @param {string} [listType="unordered"] - Type de liste :
 *   - "unordered" : liste à puces (ul)
 *   - "ordered" : liste numérotée (ol)
 *   - "none" : liste sans marqueur
 * @param {string} [className=""] - Classes CSS additionnelles
 * @param {function} [onItemClick] - Fonction appelée au clic sur un élément (reçoit l'item et l'index)
 * @param {string} [id=""] - Identifiant unique pour la liste
 * __________
 * @returns HTML UI List
 */
export default function UIList({
  items = [],
  orientation = "vertical",
  listType = "unordered",
  className = "",
  onItemClick,
  id = "",
}) {
  // Déterminer la balise (ul ou ol)
  const ListTag = listType === "ordered" ? "ol" : "ul";

  // Classes CSS
  const baseClass = "ui-list";
  const orientationClass = orientation === "horizontal" ? "ui-list-horizontal" : "ui-list-vertical";
  const typeClass = listType === "none" ? "ui-list-none" : "";
  const combinedClass = `${baseClass} ${orientationClass} ${typeClass} ${className}`.trim();

  // Gestion du clic sur un élément
  const handleItemClick = (item, index) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <ListTag id={id} className={combinedClass}>
      {items.map((item, index) => (
        <li
          key={index}
          className="ui-list-item"
          onClick={() => handleItemClick(item, index)}
          style={{ cursor: onItemClick ? "pointer" : "default" }}
        >
          {typeof item === "string" ? item : item}
        </li>
      ))}
    </ListTag>
  );
}

UIList.propTypes = {
  items: PropTypes.array.isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  listType: PropTypes.oneOf(["unordered", "ordered", "none"]),
  className: PropTypes.string,
  onItemClick: PropTypes.func,
  id: PropTypes.string,
};

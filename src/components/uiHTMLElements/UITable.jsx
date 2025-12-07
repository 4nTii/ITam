import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./UITable.css";
import { LangMessages } from "../../lang/lang";

/**
 * UITable — composant de tableau HTML réutilisable
 *
 * Props :
 * @param {Array} headers - Tableau des en-têtes [{key: string, label: string, sortable: boolean}] (requis)
 * @param {Array} data - Tableau des données à afficher (requis)
 * @param {boolean} [filterable=false] - Si true, affiche un input de filtrage global
 * @param {string} [filterPlaceholder="Search..."] - Placeholder pour l'input de filtrage
 * @param {number} [pagination=null] - Nombre d'éléments par page (si > 5, active la pagination)
 * @param {boolean} [exportable=false] - Si true, affiche les boutons d'export (CSV, XLSX, JSON)
 * @param {boolean} [distinctRows=false] - Si true, applique un style pour mieux distinguer les lignes
 * @param {string} [className=""] - Classes CSS additionnelles
 * @param {string} [id=""] - Identifiant unique
 * @param {function} [onRowClick] - Callback appelé au clic sur une ligne (reçoit la ligne)
 * @param {boolean} [striped=true] - Si true, applique des rayures alternées
 * @param {boolean} [hover=true] - Si true, applique un effet hover sur les lignes
 * @param {boolean} [bordered=false] - Si true, ajoute des bordures
 * @param {string} [emptyMessage="No data available"] - Message affiché si aucune donnée
 * __________
 * @returns HTML UI Table
 */
export default function UITable({
  headers = [],
  data = [],
  filterable = false,
  filterPlaceholder = LangMessages.uiComponents.table.search,
  pagination = null,
  exportable = false,
  distinctRows = false,
  className = "",
  id = "",
  onRowClick,
  striped = true,
  hover = true,
  bordered = false,
  emptyMessage = LangMessages.uiComponents.table.noData,
}) {
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null, // 'asc' or 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Vérifier si la pagination est active
  const isPaginated = pagination != null && pagination > 5;
  const itemsPerPage = isPaginated ? pagination : data.length;

  // Filtrer les données
  const filteredData = useMemo(() => {
    if (!filterable || !filterText) return data;

    return data.filter((row) => {
      return headers.some((header) => {
        const value = row[header.key];
        return value
          ?.toString()
          .toLowerCase()
          .includes(filterText.toLowerCase());
      });
    });
  }, [data, filterText, filterable, headers]);

  // Trier les données
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Gestion des valeurs nulles/undefined
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Comparaison numérique si les deux valeurs sont des nombres
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return sortConfig.direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      // Comparaison alphabétique
      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination des données
  const paginatedData = useMemo(() => {
    if (!isPaginated) return sortedData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage, isPaginated]);

  // Calculer le nombre total de pages
  const totalPages = isPaginated ? Math.ceil(sortedData.length / itemsPerPage) : 1;

  // Réinitialiser la page lors du changement de filtre
  useMemo(() => {
    setCurrentPage(1);
  }, [filterText, sortConfig]);

  // Gérer le tri
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        // Reset le tri
        setSortConfig({ key: null, direction: null });
        return;
      }
    }

    setSortConfig({ key, direction });
  };

  // Fonctions d'export
  const exportToCSV = () => {
    const csvContent = [
      headers.map((h) => h.label).join(","),
      ...sortedData.map((row) => headers.map((h) => row[h.key]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `table_export_${Date.now()}.csv`;
    link.click();
    setShowExportMenu(false);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(sortedData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `table_export_${Date.now()}.json`;
    link.click();
    setShowExportMenu(false);
  };

  const exportToXLSX = () => {
    // Créer un format CSV compatible Excel
    const bom = "\uFEFF";
    const csvContent = [
      headers.map((h) => h.label).join("\t"),
      ...sortedData.map((row) => headers.map((h) => row[h.key]).join("\t")),
    ].join("\n");

    const blob = new Blob([bom + csvContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `table_export_${Date.now()}.xls`;
    link.click();
    setShowExportMenu(false);
  };

  // Classes CSS pour le tableau
  const tableClasses = [
    "ui-table",
    striped && "ui-table-striped",
    hover && "ui-table-hover",
    bordered && "ui-table-bordered",
    distinctRows && "ui-table-distinct",
    onRowClick && "ui-table-clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="ui-table-container" id={id}>
      {/* Header avec filtrage et export */}
      <div className="ui-table-header">
        <div className="ui-table-header-left">
          {isPaginated && (
            <span className="ui-table-info">
              {LangMessages.uiComponents.table.showing} {((currentPage - 1) * itemsPerPage) + 1} {LangMessages.uiComponents.table.to} {Math.min(currentPage * itemsPerPage, sortedData.length)} {LangMessages.uiComponents.table.of} {sortedData.length} {LangMessages.uiComponents.table.entries}
            </span>
          )}
        </div>
        <div className="ui-table-header-right">
          {/* Input de filtrage */}
          {filterable && (
            <div className="ui-table-filter">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder={filterPlaceholder}
                className="ui-table-filter-input"
              />
              {filterText && (
                <button
                  onClick={() => setFilterText("")}
                  className="ui-table-filter-clear"
                  aria-label={LangMessages.uiComponents.table.clearFilter}
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Bouton d'export */}
          {exportable && (
            <div className="ui-table-export">
              <button
                className="ui-table-export-btn"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                {LangMessages.uiComponents.table.export} ▼
              </button>
              {showExportMenu && (
                <div className="ui-table-export-menu">
                  <button onClick={exportToCSV}>{LangMessages.uiComponents.table.exportCSV}</button>
                  <button onClick={exportToXLSX}>{LangMessages.uiComponents.table.exportExcel}</button>
                  <button onClick={exportToJSON}>{LangMessages.uiComponents.table.exportJSON}</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tableau */}
      <div className="ui-table-wrapper">
        <table className={tableClasses}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={header.sortable ? "sortable" : ""}
                  onClick={() => header.sortable && handleSort(header.key)}
                >
                  <div className="ui-table-header-content">
                    <span>{header.label}</span>
                    {header.sortable && (
                      <span className="ui-table-sort-icon">
                        {sortConfig.key === header.key ? (
                          sortConfig.direction === "asc" ? (
                            <span className="sort-active">▲</span>
                          ) : (
                            <span className="sort-active">▼</span>
                          )
                        ) : (
                          <span className="sort-inactive">⇅</span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header.key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="ui-table-empty">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {isPaginated && totalPages > 1 && (
        <div className="ui-table-pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="ui-table-pagination-btn"
          >
            {LangMessages.uiComponents.table.previous}
          </button>
          <div className="ui-table-pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`ui-table-pagination-page ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ui-table-pagination-btn"
          >
            {LangMessages.uiComponents.table.next}
          </button>
        </div>
      )}
    </div>
  );
}

UITable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterable: PropTypes.bool,
  filterPlaceholder: PropTypes.string,
  pagination: PropTypes.number,
  exportable: PropTypes.bool,
  distinctRows: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  onRowClick: PropTypes.func,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  bordered: PropTypes.bool,
  emptyMessage: PropTypes.string,
};

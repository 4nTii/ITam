import React from "react";
import PropTypes from "prop-types";
import "./UICheckbox.css";

/**
 * UICheckbox
 * ----------
 * Modes:
 * 1. **Single-checkbox mode**: Use the `checked` prop (boolean) to control its state. The `onChange` handler
 *    receives the native `event` object, so you can access `event.target.checked`.
 * 2. **Multi-choice mode**: Use the `selectedValues` prop (array of strings) and `value` (string) to manage
 *    multiple selections. The `onChange` handler receives the updated array of selected values.
 *
 * Props:
 * @param {string} id - The unique identifier for the checkbox input. (Required)
 * @param {string} [name] - Optional name attribute for the checkbox input.
 * @param {boolean} [checked=false] - Used in single-checkbox mode to indicate checked state.
 * @param {string} [value] - The value associated with the checkbox; required for multi-choice mode.
 * @param {string[]} [selectedValues=null] - Array of selected values for multi-choice mode.
 * @param {string} [label="Checkbox"] - Text label displayed next to the checkbox.
 * @param {boolean} [deleteStyle=false] - If true, applies "delete" styling to the checkbox.
 * @param {function} onChange - Callback triggered when the checkbox state changes.
 *                                - In single mode: receives the native event object.
 *                                - In multi-choice mode: receives the updated array of selected values.
 * @param {boolean} [disabled=false] - Disables the checkbox if true.
 * @param {string} [className=""] - Additional CSS classes to apply to the label element.
 * __________
 * @returns HTML UI Checkbox
 */

export default function UICheckbox({
  id = "",
  name,
  checked = false, // single-checkbox mode
  value,
  selectedValues = null, // array for multi-choice, optional
  label = "Checkbox",
  deleteStyle = false,
  onChange,
  disabled = false,
  className = "",
}) {
  const isChecked = selectedValues
    ? selectedValues.includes(value) // multi-choice
    : checked; // single-checkbox

  const handleChange = (e) => {
    if (!onChange) return;

    if (selectedValues) {
      // multi-choice: return updated array
      if (e.target.checked) {
        onChange([...selectedValues, value]);
      } else {
        onChange(selectedValues.filter((v) => v !== value));
      }
    } else {
      // single-checkbox: return event (so user can access e.target.checked)
      onChange(e);
    }
  };

  return (
    <div className="m-2">
      <input
        type="checkbox"
        {...(name ? { name } : {})}
        id={id}
        value={value}
        className={deleteStyle ? "checkbox-delete" : "checkbox"}
        disabled={disabled}
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor={id} className={`ms-1 ${className}`}>
        {label}
      </label>
    </div>
  );
}

UICheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  deleteStyle: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

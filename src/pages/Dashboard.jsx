import React, { useEffect } from "react";
import UICheckbox from "../components/uiElements/UICheckbox.jsx";
import { useState } from "react";

function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div>
      <UICheckbox
        id="option1"
        name="fruits"
        label="Apple"
        value="apple"
        selectedValues={selectedOptions}
        onChange={setSelectedOptions}
      />

      <UICheckbox
        id="option2"
        name="fruits"
        label="Banana"
        value="banana"
        selectedValues={selectedOptions}
        onChange={setSelectedOptions}
      />

      <UICheckbox
        id="option3"
        name="fruits"
        label="Orange"
        value="orange"
        selectedValues={selectedOptions}
        onChange={setSelectedOptions}
      />
    </div>
  );
}

export default Dashboard;

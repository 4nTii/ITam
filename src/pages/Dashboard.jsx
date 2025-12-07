import React from "react";
import UITable from "../components/uiHTMLElements/UITable.jsx";
import NavMain from "../components/uiStructure/NavMain";
import LeftMenu from "../components/uiStructure/LeftMenu";
import { useNavigate } from "react-router-dom";
import { LangMessages } from "../lang/lang";

function Dashboard() {
  const navigate = useNavigate();

  // Handler functions for NavMain
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMyAccountClick = () => {
    // navigate("/my-account");
  };

  const handleSettingsClick = () => {
    // navigate("/settings");
  };

  const handleHelpClick = () => {
    // navigate("/help");
  };

  return (
    <div>
      <NavMain
        userName="John Doe"
        onLogoClick={handleLogoClick}
        onMyAccountClick={handleMyAccountClick}
        onSettingsClick={handleSettingsClick}
        onHelpClick={handleHelpClick}
      />
      <div style={{ marginLeft: "60px", padding: "2rem" }}>
        <h1>Dashboard</h1>
        <p>Welcome to the ITam Dashboard!</p>
        <p>
          The left menu is always minimized. Hover over it to see the full menu
          with all options.
        </p>
        <p>
          Click on sections to expand sub-items and navigate to different pages.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;

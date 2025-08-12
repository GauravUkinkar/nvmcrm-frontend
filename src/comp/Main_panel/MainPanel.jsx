import React from "react";
import "./MainPanel.scss";
import Sidebar from "../sidebar/Sidebar";
const MainPanel = ({ children }) => {
  return (
    <>
      <div class="mainpanel_parent parent">
        <div class="mainpanel">
          <div class="sidebar_section">
            <Sidebar />
          </div>
          <div class="main_panel_dection">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainPanel;

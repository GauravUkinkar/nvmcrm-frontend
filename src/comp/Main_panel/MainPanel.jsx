import React, { useState } from "react";
import "./MianPanel.scss";
import Sidebar from "../sidebar/Sidebar";
const MainPanel = ({ children }) => {
    const [active,setActive] = useState(false)
  return (
    <>
      <div class="mainpanel_parent parent">
        <div class="mainpanel">
          <div class={active ? "sidebar_section active" : "sidebar_section"} onClick={()=>setActive(!active)} >
            <Sidebar active={active} />
          </div>
          <div class={active ? "main_panel_dection active" : "main_panel_dection"}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default MainPanel;

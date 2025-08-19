import React, { useEffect, useState } from "react";
import "./MianPanel.scss";
import Sidebar from "../sidebar/Sidebar";
const MainPanel = ({ children, length, text }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setActive(true);
    }
  }, []);
  return (
    <>
      <div class="mainpanel_parent parent">
        <div class="mainpanel">
          <div class={active ? "sidebar_section active" : "sidebar_section"}>
            <Sidebar setActive={setActive} active={active} />
          </div>
          <div
            class={active ? "main_panel_dection active" : "main_panel_dection"}
          >
            {length && (
              <div class="topbar_section">
                {" "}
                <span class="count">{length}</span> {text}{" "}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPanel;

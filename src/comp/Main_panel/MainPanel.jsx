import React, { useEffect, useState } from "react";
import "./MianPanel.scss";
import Sidebar from "../sidebar/Sidebar";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const MainPanel = ({ children, length, text }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
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
            <div class="topbar_section">
              <div className="backbutton" onClick={() => navigate(-1)}>
                <IoArrowBackOutline />
              </div>{" "}
              {length && (
                <span class="count">
                  {length} : {text}
                </span>
              )}
            </div>

            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPanel;

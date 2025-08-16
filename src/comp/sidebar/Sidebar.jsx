import React, { useState } from "react";
import "./Sidebar.scss";
import logo from "../../assets/logo-2.webp";
import small_logo from "../../assets/small_logo.webp";
import { Link } from "react-router-dom";
import { 
  IoPeople, 
  IoPersonAdd, 
  IoHome, 
  IoBarChart, 
  IoCheckboxOutline,
  IoAddCircleOutline,
  IoPersonCircleOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { 
  MdOutlineArrowForward, 
  MdDashboard, 
  MdTrackChanges,
  MdAssignment,
  MdHistory 
} from "react-icons/md";
import { 
  FaProjectDiagram, 
  FaUsers, 
  FaUserTie, 
  FaBuilding
} from "react-icons/fa";

const Sidebar = ({ active }) => {
  const [activeIndex, setActiveIndex] = useState();
  
  const navlinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: <MdDashboard />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaProjectDiagram />,
    },    
    {
      name: "Clients",
      path: "/clients",
      icon: <FaUsers />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <IoPeople />,
    },
    {
      name: "Brokers",
      path: "/brokers",
      icon: <FaUserTie />,
    },
    {
      name: "Properties",
      path: "/properties",
      icon: <FaBuilding />,
    },
    {
      name: "BD Tracker",
      path: "/bdTracker",
      icon: <MdTrackChanges />,
    },
    {
      name: "Action Items",
      path: "/actionItems",
      icon: <MdAssignment />,
    },
    {
      name: "Activity Log",
      path: "/activityLogs",
      icon: <MdHistory />,
    },
    {
      name: "Add Entries",
      icon: <IoAddCircleOutline />,
      icon2: <MdOutlineArrowForward />,
      Children: [
        {
          name: "Add Client",
          path: "/addclients",
          icon: <IoPersonAdd />,
        },
        {
          name: "Add Employee",
          path: "/addemployee",
          icon: <IoPeople />,
        },
        {
          name: "Add Properties",
          path: "/addproperties",
          icon: <IoHome />,
        },
        {
          name: "Add Broker",
          path: "/addbroker",
          icon: <FaUserTie />,
        },
        {
          name: "Add BD Tracker",
          path: "/addBdTracker",
          icon: <IoBarChart />,
        },
        {
          name: "Add Action Items",
          path: "/addactionitems",
          icon: <IoCheckboxOutline />,
        },
      ],
    },
  ];

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_section_inner">
          <div className="logo">
            {active ? (
              <img src={small_logo} alt="" />
            ) : (
              <img src={logo} alt="" />
            )}
          </div>
          {!active ? (
            <div className="sidebar_items">
              {navlinks &&
                navlinks.map((item, index) => (
                  <Link onMouseEnter={() => setActiveIndex(index)} key={index} to={item.path}>
                    <div className="nav-content">
                      <span className="nav-icon">{item.icon}</span>
                      {item.name}
                    </div>
                    {item?.icon2 && <span className="arrow-icon">{item.icon2}</span>}
                    {(activeIndex === index && item?.Children) && (
                      <div className="children" onMouseLeave={() => setActiveIndex(null)}>
                        {item.Children &&
                          item.Children.map((item2, index2) => (
                            <Link key={index2} to={item2.path}>
                              <span className="nav-icon">{item2.icon}</span>
                              {item2.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </Link>
                ))}
            </div>
          ) : (
            <div className="toggle_sidbar_icons">
              {navlinks &&
                navlinks.map((item, index) => (
                  <Link key={index} to={item.path} data-tooltip={item.name}>
                    {item.icon}
                  </Link>
                ))}
            </div>
          )}

          {/* Footer Section */}
          <div className="sidebar_footer">
            {!active ? (
              <>
                <div className="user-info">
                  <IoPersonCircleOutline className="user-icon" />
                  <span className="username">ashok_dhas</span>
                </div>
                <button className="logout-btn" onClick={() => console.log('Logout clicked')}>
                  <IoLogOutOutline />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="collapsed-footer">
                <Link className="user-icon-collapsed" data-tooltip="ashok_dhas">
                  <IoPersonCircleOutline />
                </Link>
                <button className="logout-btn-collapsed" data-tooltip="Logout" onClick={() => console.log('Logout clicked')}>
                  <IoLogOutOutline />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
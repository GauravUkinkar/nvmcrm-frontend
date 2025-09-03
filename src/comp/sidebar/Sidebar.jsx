import React, { Children, useContext, useState } from "react";
import "./Sidebar.scss";

import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { RiPagesLine } from "react-icons/ri";
import {
  IoPeople,
  IoPersonAdd,
  IoHome,
  IoBarChart,
  IoCheckboxOutline,
  IoAddCircleOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import {
  MdOutlineArrowForward,
  MdDashboard,
  MdTrackChanges,
  MdAssignment,
  MdHistory,
} from "react-icons/md";
import {
  FaProjectDiagram,
  FaUsers,
  FaUserTie,
  FaBuilding,
} from "react-icons/fa";
import { UserContext } from "../../Context";
import axios from "axios";

const Sidebar = ({ active, setActive }) => {
  const [activeIndex, setActiveIndex] = useState();
  const location = useLocation();

  const { user } = useContext(UserContext);
  const handleLogout = async () => {
    try {

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/logout?username=${user?.userName}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });;
      if(response.status === 200){
      localStorage.clear();
    window.location.href = "/login";
      }

    } catch (error) {
      console.log(error)
    }
    
  };

  const navlinks = [
    ...(user.role === "ADMIN"
      ? [
          {
            name: "Dashboard",
            path: "/",
            icon: <MdDashboard />,
          },
        ]
      : []),
    {
      name: "Add Entries",
      path: "#", // Added path for collapsed sidebar tooltip
      icon: <IoAddCircleOutline />,
      icon2: <MdOutlineArrowForward />,
      Children: [
        {
          name: "Add Client",
          path: "/addclients",
          icon: <IoPersonAdd />,
        },

        ...(user.role === "ADMIN"
          ? [
              {
                name: "Add Employee",
                path: "/addemployee",
                icon: <IoPeople />,
              },
            ]
          : []),

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
    {
      name: "Existing Entries",
      path: "#", // Added path for collapsed sidebar tooltip
      icon: <RiPagesLine />,
      icon2: <MdOutlineArrowForward />,
      Children: [
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
        ...(user.role === "ADMIN"
          ? [
              {
                name: "Employees",
                path: "/employees",
                icon: <IoPeople />,
              },
              {
                name: "Manage Users",
                path: "/manageusers",
                icon: <IoPeople />,
              },
             
            ]
          : []),

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
      ],
    },

    ...(user.role === "ADMIN"
      ? [
          {
            name: "Login Logs",
            path: "/loginlogs",
            icon: <MdHistory />,
          },
          {
            name: "Activity Log",
            path: "/activityLogs",
            icon: <MdHistory />,
          },
        ]
      : []),
  ];

  // Handle click for Add Entries in collapsed mode
  const handleAddEntriesClick = (e, item) => {
    if (active && item.Children) {
      e.preventDefault(); // Prevent navigation for "Add Entries" in collapsed mode
      // You could implement a dropdown or modal here if needed
      console.log("Add Entries clicked in collapsed mode");
    }
  };



  return (
    <>
      <div className="sidebar">
        <div className="sidebar_section_inner">
          <div class="top_bar">
            <div class="arrow" onClick={() => setActive(!active)}>
              {active ? <FaArrowRight /> : <FaArrowLeft />}
            </div>
            <div className="logo">
              <div class="img bg-img-contain"></div>
            </div>
          </div>

          {!active ? (
            <div className="sidebar_items">
              {navlinks &&
                navlinks.map((item, index) => (
                  <div
                    key={index}
                    className="nav-item-wrapper"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <Link
                      className={
                        location.pathname === item.path ? "active link" : "link"
                      }
                      to={item.path}
                    >
                      <div className="nav-content">
                        <span className="nav-icon">{item.icon}</span>
                        {item.name}
                      </div>
                      {item?.icon2 && (
                        <span className="arrow-icon">{item.icon2}</span>
                      )}
                    </Link>

                    {/* Children appear directly below parent */}
                    {activeIndex === index && item.Children && (
                      <div className="children">
                        {item.Children.map((item2, index2) => (
                          <Link
                            className={
                              location.pathname === item2.path
                                ? "childLink active"
                                : "childLink"
                            }
                            key={index2}
                            to={item2.path}
                          >
                            <span className="nav-icon">{item2.icon}</span>
                            {item2.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="toggle_sidbar_icons">
              {navlinks &&
                navlinks.map((item, index) => {
                  // For items with children, we'll show a different tooltip
                  const tooltipText = item.Children
                    ? `${item.name} (Click for options)`
                    : item.name;

                  return (
                    <Link
                      className={
                        location.pathname === item.path ? "active link" : "link"
                      }
                      key={index}
                      to={item.Children ? "#" : item.path}
                      data-tooltip={tooltipText}
                      onClick={(e) => handleAddEntriesClick(e, item)}
                      title={tooltipText} // Fallback for accessibility
                    >
                      {item.icon}
                    </Link>
                  );
                })}
            </div>
          )}

          {/* Footer Section */}
          <div className="sidebar_footer">
            {!active ? (
              <>
                <div className="user-info">
                  <IoPersonCircleOutline className="user-icon" />
                  <span className="username"> {`${user?.userName}`} </span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <IoLogOutOutline />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="collapsed-footer">
                <Link
                  className="user-icon-collapsed"
                  data-tooltip={`${user?.userName}`}
                  to="#"
                >
                  <IoPersonCircleOutline />
                </Link>
                <button
                  className="logout-btn-collapsed"
                  data-tooltip="Logout"
                  onClick={handleLogout}
                >
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

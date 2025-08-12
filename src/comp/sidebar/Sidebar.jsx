import React from "react";
import "./Sidebar.scss";
import logo from "../../assets/logo-2.webp";
import small_logo from "../../assets/small_logo.webp";
import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaPeopleLine } from "react-icons/fa6";
import Input from "../input/Input";
const Sidebar = ({ active }) => {
  const navlinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: <IoGrid />,
    },
    {
      name: "Clients",
      path: "/clients",
      icon: <FaPeopleLine />,
    },
    {
      name: "Add Clients",
      path: "/addclients",
      icon: <FaPeopleLine />,
    },
    {
      name: "Properties",
      path: "/properties",
      icon: <FaPeopleLine />,
    },
    {
      name: "BD Tracker",
      path: "/bdTracker",
      icon: <FaPeopleLine />,
    },
    {
      name: "Action Items",
      path: "/actionItems",
      icon: <FaPeopleLine />,
    },
    {
      name: "Activity Log",
      path: "/activityLogs",
      icon: <FaPeopleLine />,
    }
  ];
  return (
    <>
      <div class="sidebar">
        <div class="sidebar_section_inner">
          <div class="logo">
            {active ? (
              <img src={small_logo} alt="" />
            ) : (
              <img src={logo} alt="" />
            )}
          </div>
          {!active ? (
            <div class="sidebar_items">
              {navlinks &&
                navlinks.map((item, index) => (
                  <Link key={index} to={item.path}>
                    {" "}
                    {item.name}{" "}
                  </Link>
                ))}
            </div>
          ) : (
            <div class="toggle_sidbar_icons">
              {navlinks &&
                navlinks.map((item, index) => (
                  <Link key={index} to={item.path}>
                    {" "}
                    {item.icon}{" "}
                  </Link>
                ))}
            </div>
          )}

          
        </div>
      </div>
    </>
  );
};

export default Sidebar;

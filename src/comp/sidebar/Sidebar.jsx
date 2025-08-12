import React, { Children } from "react";
import "./Sidebar.scss";
import logo from "../../assets/logo-2.webp";
import small_logo from "../../assets/small_logo.webp";
import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaPeopleLine } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const Sidebar = ({ active }) => {
  const navlinks = [
    {
      name: "Dashboard",
      path: "/",
      icon: <IoGrid />,
    },   
    {
      name: "Add Clients",
      path: "/addclients",
      icon: <FaPeopleLine />,
    },
    {
      name: "Clients",
      path: "/clients",
      icon: <FaPeopleLine />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaPeopleLine />,
    },
    {
      name: "Brokers",
      path: "/brokers",
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
    },
    {
      name: "Add Entries",
      icon: <FaPeopleLine />,
      icon2:<MdOutlineKeyboardArrowDown />,
      Children: [
        {
          name: "Add Client",
          path: "/addclients",
          icon: <FaPeopleLine />,
        },
      ],
    },
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

                    <span>{item?.icon2}</span>
                  </Link>
                ))}

                <div class="children">

                </div>
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

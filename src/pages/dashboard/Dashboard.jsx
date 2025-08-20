import React, { useContext, useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import "./Dashboard.scss";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Tooltip } from "react-tooltip";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clientGetAll } from "../../(api)/Client";
import { projectsGetAll } from "../../(api)/Project";
import { employeeGetAll } from "../../(api)/Employee";
import { brokerGetAll } from "../../(api)/BrokerApi";
import { propertyGetAll } from "../../(api)/Properties";
import { bdTrackerGetAll } from "../../(api)/BdTracker";
import { actionGetAll } from "../../(api)/ActionItems";
import { activityLogsGetAll } from "../../(api)/ActivityLogs";
import { UserContext } from "../../Context";
import CountUp from "react-countup";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [countingData, setCountingData] = useState({
    clients: 0,
    projects: 0,
    employees: 0,
    manageusers: 0,
    brokers: 0,
    properties: 0,
    bdTracker: 0,
    actionItems: 0,
    activityLogs: 0,
  });
  const gridItems = [
    {
      title: "Clients",
      count: countingData.clients,
      path: "/clients",
    },
    {
      title: "Projects",
      count: countingData.projects,
      path: "/projects",
    },
    {
      title: "Employees",
      count: countingData.employees,
      path: "/employees",
    },

    {
      title: "Brokers",
      count: countingData.brokers,
      path: "/brokers",
    },
    {
      title: "Properties",
      count: countingData.properties,
      path: "/properties",
    },
    {
      title: "BD Tracker",
      count: countingData.bdTracker,
      path: "/bdTracker",
    },
    {
      title: "Action Items",
      count: countingData.actionItems,
      path: "/actionItems",
    },
    {
      title: "Activity Logs",
      count: countingData.activityLogs,
      path: "/activityLogs",
    },
  ];

  useEffect(() => {
    clientGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          clients: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    projectsGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          projects: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    employeeGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          employees: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    brokerGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          brokers: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    propertyGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          properties: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    bdTrackerGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          bdTracker: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    actionGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          actionItems: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    activityLogsGetAll()
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          activityLogs: res.data.length,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const role = user?.role;

    if (role !== "ADMIN" && location.pathname === "/") {
      navigate("/properties", { replace: true });
    }
  }, [user, location, navigate]);

  return (
    <>
      <MainPanel>
        <div class="panel">
          <h2>Dashboard</h2>
          <div class="grid_panel">
            {gridItems.map((item, index) => (
              <div key={index} class="grid_item">
                <div class="top_bar">
                  <p>{item?.title}</p>
                  <Tooltip id="my-tooltip" />
                  <Link
                    to={item?.path}
                    data-tooltip-place="left"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Details"
                  >
                    <HiOutlineDotsVertical />
                  </Link>
                </div>
                <h2>
                  <CountUp end={item?.count} />
                </h2>
              </div>
            ))}
          </div>
        </div>
      </MainPanel>
    </>
  );
};

export default Dashboard;

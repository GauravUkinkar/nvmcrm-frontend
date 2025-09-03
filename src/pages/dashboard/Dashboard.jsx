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

import { bdTrackerGetAll } from "../../(api)/BdTracker";
import { actionGetAll } from "../../(api)/ActionItems";
import { activityLogsGetAll } from "../../(api)/ActivityLogs";
import { UserContext } from "../../Context";
import CountUp from "react-countup";
import axios from "axios";
import { propertyGetAll } from "../../(api)/Properties";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [properties, setProperties] = useState([]);
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
      title: "Brokers",
      count: countingData.brokers,
      path: "/brokers",
    },
    {
      title: "BD Tracker",
      count: countingData.bdTracker,
      path: "/bdTracker",
    },

    {
      title: "Projects",
      count: countingData.projects,
      path: "/projects",
    },
  ];

  const getPropertiesCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}property/allPropertyCounts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

    employeeGetAll(0, 10)
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          employees: res.totalItems,
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

    bdTrackerGetAll(0, 10)
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          bdTracker: res.totalItems,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    actionGetAll(0, 10)
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          actionItems: res.totalItems,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    activityLogsGetAll(0, 10)
      .then((res) => {
        setCountingData((prev) => ({
          ...prev,
          activityLogs: res.totalItems,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    getPropertiesCount();
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
              <Link to={item?.path} key={index} class="grid_item">
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
              </Link>
            ))}

            <Link className="grid_item properties_grid">
              <div class="top">
                <p>Properties - </p>{" "}
                <p className="count">
                  {" "}
                  <CountUp end={countingData?.properties} />{" "}
                </p>{" "}
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="top_bar">
                    <h4>Residential</h4>
                    <h3>{properties?.Residential?.total || 0}</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/properties?type=Residential&status=Available">
                        <p>Available</p>
                        <p>{properties?.Residential?.available || 0}</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Expression of Interest">
                        <p>Expression of Interest</p>
                        <p>
                          {properties?.Residential?.expressionofinterest || 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link   to="/properties?type=Residential&status=Booked - Token Amount not paid">
                        <p>Booked - Token Amount not paid</p>
                        <p>
                          {properties?.Residential?.bookedtokenamountnotpaid ||
                            0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link   to="/properties?type=Residential&status=Booked - Token amount paid">
                        <p>Booked - Token amount paid</p>
                        <p>
                          {properties?.Residential?.bookedtokenamountpaid || 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link   to="/properties?type=Residential&status=Booked - Partial payment made">
                        {" "}
                        <p> Booked - Partial payment made</p>
                        <p>
                          {properties?.Residential?.bookedpartialpaymentmade ||
                            0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link  to="/properties?type=Residential&status=Booked - Total payment made">
                        {" "}
                        <p> Booked - Total payment made</p>
                        <p>
                          {properties?.Residential?.bookedtotalpaymentmade || 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link  to="/properties?type=Residential&status=Registry Scheduled">
                        <p> Registry Scheduled</p>
                        <p>
                          {properties?.Residential?.registryscheduled
                            ? properties?.Residential?.registryscheduled
                            : 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link   to="/properties?type=Residential&status=Registry Completed">
                        <p>Registry Completed</p>
                        <p>
                          {properties?.Residential?.registrycompleted
                            ? properties?.Residential?.registrycompleted
                            : 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link   to="/properties?type=Residential&status=Possession handed Over">
                        <p>Possession handed Over</p>
                        <p>
                          {properties?.Residential?.possessionhandlerover
                            ? properties?.Residential?.possessionhandlerover
                            : 0}
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="right">
                  <div class="top_bar">
                    <h4>Commercial</h4>
                    <h3>{properties?.Commercial?.total || 0}</h3>
                  </div>
                  <ul>
                    <li>
                      <Link  to="/properties?type=Commercial&status=Available">
                        <p>Available</p>
                        <p>{properties?.Commercial?.available || 0}</p>
                      </Link>
                    </li>

                    <li>
                      <Link  to="/properties?type=Commercial&status=Expression of Interest">
                        {" "}
                        <p>Expression of Interest</p>
                        <p>
                          {properties?.Commercial?.expressionofinterest || 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Token Amount not paid">
                        {" "}
                        <p>Booked - Token Amount not paid</p>
                        <p>
                          {properties?.Commercial?.bookedtokenamountnotpaid ||
                            0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Token amount paid">
                        {" "}
                        <p>Booked - Token amount paid</p>
                        <p>
                          {properties?.Commercial?.bookedtokenamountpaid || 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Partial payment made">
                        <p> Booked - Partial payment made</p>
                        <p>
                          {properties?.Commercial?.bookedpartialpaymentmade ||
                            0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Total payment made">
                        {" "}
                        <p> Booked - Total payment made</p>
                        <p>
                          {properties?.Commercial?.bookedtotalpaymentmade || 0}
                        </p>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Registry Scheduled">
                        {" "}
                        <p> Registry Scheduled</p>
                        <p>
                          {properties?.Commercial?.registryscheduled
                            ? properties?.Commercial?.registryscheduled
                            : 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Registry Completed">
                        {" "}
                        <p>Registry Completed</p>
                        <p>
                          {properties?.Commercial?.registrycompleted
                            ? properties?.Commercial?.registrycompleted
                            : 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Possession handed Over">
                        {" "}
                        <p>Possession handed Over</p>
                        <p>
                          {properties?.Commercial?.possessionhandlerover
                            ? properties?.Commercial?.possessionhandlerover
                            : 0}
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </MainPanel>
    </>
  );
};

export default Dashboard;

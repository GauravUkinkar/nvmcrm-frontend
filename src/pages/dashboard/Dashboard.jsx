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
import { DatePicker } from "antd";
import dayjs from "dayjs";
import SelectInput from "../../comp/SelectInput/SelectInput";

const { RangePicker } = DatePicker;

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
  const [date, setDate] = useState({
    fromDate: "",
    toDate: "",
  });

  const [filterStatus, setFilterStatus] = useState("");

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

    // {
    //   title: "Projects",
    //   count: countingData.projects,
    //   path: "/projects",
    // },
  ];

  const getPropertiesCount = async () => {
    try {
      const token = localStorage.getItem("token");
      let today = false;
      let previous = false;
      if (date?.fromDate && date?.toDate) {
        // only update UI state if needed
        if (filterStatus !== "") setFilterStatus("");
        today = false;
        previous = false;
      } else if (filterStatus === "Till Date") {
        today = true;
      } else if (filterStatus === "Previous Day") {
        previous = true;
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }property/allPropertyCounts?fromDate=${date?.fromDate}&toDate=${
          date?.toDate
        }&today=${today}&yesterday=${previous}`,
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
  }, []);

  useEffect(() => {
    getPropertiesCount();
  }, [date, filterStatus]);

  useEffect(() => {
    const role = user?.role;

    if (role !== "ADMIN" && location.pathname === "/") {
      navigate("/properties", { replace: true });
    }
  }, [user, location, navigate]);

  const handleDateChange = (dates, dateStrings) => {
    setFilterStatus("");
    setDate({
      fromDate: dateStrings[0],
      toDate: dateStrings[1],
    });
  };

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
                  <span
                    // to={item?.path}
                    data-tooltip-place="left"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Details"
                  >
                    <HiOutlineDotsVertical />
                  </span>
                </div>
                <h2>
                  <CountUp end={item?.count} />
                </h2>
              </Link>
            ))}

            <div className="grid_item properties_grid">
              <div class="top">
                <div class="left">
                  <p>Plots - </p>{" "}
                  <p className="count">
                    {" "}
                    <CountUp end={countingData?.properties} />{" "}
                  </p>{" "}
                </div>
                <div class="date_picker">
                  <div class="status_input">
                    <SelectInput
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="">Select Filter</option>
                      <option value="Till Date">Till Date</option>
                      <option value="Previous Day">Previous Day</option>
                    </SelectInput>
                  </div>
                  <RangePicker
                    value={[
                      date.fromDate ? dayjs(date.fromDate) : null,
                      date.toDate ? dayjs(date.toDate) : null,
                    ]}
                    onChange={(dates, dateStrings) => {
                      handleDateChange(dates, dateStrings);
                    }}
                  />
                </div>
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="top_bar">
                    <h4>Residential</h4>
                    <div class="top_bar_left">
                      <h3>{properties?.Residential?.total || 0}</h3>
                      <h5 className="percentage">
                        {" "}
                        {(
                          ((properties?.Residential?.total || 0) /
                            countingData?.properties) *
                          100
                        )?.toFixed(2)}{" "}
                        %{" "}
                      </h5>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <div className="nav">
                        <p>Total Available</p>
                        <div class="topbar_left">
                          <p>
                            {(properties?.Residential
                              ?.availablenoexpressionofinterest || 0) +
                              (properties?.Residential
                                ?.availableexpressionofinterest || 0) || 0}
                          </p>
                          <h5 className="percentage">
                            {(() => {
                              const availableEOI =
                                properties?.Residential
                                  ?.availableexpressionofinterest || 0;
                              const availableNoEOI =
                                properties?.Residential
                                  ?.availablenoexpressionofinterest || 0;
                              const total = availableEOI + availableNoEOI;

                              return total > 0
                                ? (
                                    (total / properties?.Residential?.total) *
                                    100
                                  ).toFixed(2)
                                : "0.00";
                            })()}
                            %
                          </h5>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Available No Expression of Interest">
                        <p>Available - Expression of No interest</p>

                        <div class="topbar_left">
                          <p>
                            {properties?.Residential
                              ?.availablenoexpressionofinterest || 0}
                          </p>
                          <h5>
                            {(() => {
                              const availableEOI =
                                properties?.Residential
                                  ?.availableexpressionofinterest || 0;
                              const availableNoEOI =
                                properties?.Residential
                                  ?.availablenoexpressionofinterest || 0;
                              const total = availableEOI + availableNoEOI;

                              return total > 0
                                ? ((availableNoEOI / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Available Expression of interest">
                        <p>Available - Expression of interest</p>
                        <div class="topbar_left">
                          <p>
                            {properties?.Residential
                              ?.availableexpressionofinterest || 0}
                          </p>
                          <h5>
                            {(() => {
                              const availableEOI =
                                properties?.Residential
                                  ?.availableexpressionofinterest || 0;
                              const availableNoEOI =
                                properties?.Residential
                                  ?.availablenoexpressionofinterest || 0;
                              const total = availableEOI + availableNoEOI;

                              return total > 0
                                ? ((availableEOI / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/properties?type=Residential&status=Expression of Interest">
                        <p>Expression of Interest</p>
                        <div class="topbar_left">
                          <p>
                            {properties?.Residential?.expressionofinterest || 0}
                          </p>

                          <h5>
                            {" "}
                            {(
                              (properties?.Residential?.expressionofinterest /
                                properties?.Residential?.total) *
                              100
                            )?.toFixed(2)} %
                          </h5>
                        </div>
                      </Link>
                    </li> */}
                    <li>
                      <div className="nav">
                        <p>Total Booked </p>
                        <div class="topbar_left">
                          <p>
                            {(properties?.Residential
                              ?.bookedtokenamountnotpaid || 0) +
                              (properties?.Residential?.bookedtokenamountpaid ||
                                0) +
                              (properties?.Residential
                                ?.bookedpartialpaymentmade || 0) +
                              (properties?.Residential
                                ?.bookedtotalpaymentmade || 0) || 0}
                          </p>
                          <h5>
                            {(
                              (((properties?.Residential
                                ?.bookedtokenamountnotpaid || 0) +
                                (properties?.Residential
                                  ?.bookedtokenamountpaid || 0) +
                                (properties?.Residential
                                  ?.bookedpartialpaymentmade || 0) +
                                (properties?.Residential
                                  ?.bookedtotalpaymentmade || 0)) /
                                (properties?.Residential?.total || 1)) *
                              100
                            ).toFixed(2)}
                            %
                          </h5>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Booked - Token Amount not paid">
                        <div class="list_right">
                          <p style={{ color: "red" }}>R1.</p>
                          <p>Booked - Token Amount not paid</p>
                        </div>
                        <div class="topbar_left">
                          <p>
                            {properties?.Residential
                              ?.bookedtokenamountnotpaid || 0}
                          </p>
                          <h5>
                            {(() => {
                              const tokenNotPaid =
                                properties?.Residential
                                  ?.bookedtokenamountnotpaid || 0;
                              const tokenPaid =
                                properties?.Residential
                                  ?.bookedtokenamountpaid || 0;
                              const partialPaid =
                                properties?.Residential
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Residential
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((tokenNotPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Booked - Token amount paid">
                        <div class="list_right">
                          <p style={{ color: "red" }}>R2.</p>
                          <p>Booked - Token Amount paid</p>
                        </div>

                        <div class="topbar_left">
                          <p>
                            {properties?.Residential?.bookedtokenamountpaid ||
                              0}
                          </p>
                          <h5>
                            {(() => {
                              const tokenPaid =
                                properties?.Residential
                                  ?.bookedtokenamountpaid || 0;
                              const tokenNotPaid =
                                properties?.Residential
                                  ?.bookedtokenamountnotpaid || 0;
                              const partialPaid =
                                properties?.Residential
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Residential
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((tokenPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Booked - Partial payment made">
                        {" "}
                        <div class="list_right">
                          <p style={{ color: "red" }}>R3.</p>
                          <p>Booked - Partial payment made</p>
                        </div>
                        <div class="topbar_left">
                          <p>
                            {properties?.Residential
                              ?.bookedpartialpaymentmade || 0}
                          </p>
                          <h5>
                            {(() => {
                              const tokenNotPaid =
                                properties?.Residential
                                  ?.bookedtokenamountnotpaid || 0;
                              const tokenPaid =
                                properties?.Residential
                                  ?.bookedtokenamountpaid || 0;
                              const partialPaid =
                                properties?.Residential
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Residential
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((partialPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Booked - Total payment made">
                        {" "}
                        <div class="list_right">
                          <p style={{ color: "red" }}>R4.</p>
                          <p>Booked - Total payment made</p>
                        </div>
                        <div class="topbar_left">
                          <p>
                            {properties?.Residential?.bookedtotalpaymentmade ||
                              0}
                          </p>

                          <h5>
                            {(() => {
                              const tokenNotPaid =
                                properties?.Residential
                                  ?.bookedtokenamountnotpaid || 0;
                              const tokenPaid =
                                properties?.Residential
                                  ?.bookedtokenamountpaid || 0;
                              const partialPaid =
                                properties?.Residential
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Residential
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((totalPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Registry Scheduled">
                        <p> Registry Scheduled</p>
                        <p>
                          {properties?.Residential?.registryscheduled
                            ? properties?.Residential?.registryscheduled
                            : 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Registry Completed">
                        <p>Registry Completed</p>
                        <p>
                          {properties?.Residential?.registrycompleted
                            ? properties?.Residential?.registrycompleted
                            : 0}
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Residential&status=Possession handed Over">
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

                    <div class="top_bar_left">
                      <h3>{properties?.Commercial?.total || 0}</h3>
                      <h5 className="percentage">
                        {" "}
                        {(
                          ((properties?.Commercial?.total || 0) /
                            countingData?.properties) *
                          100
                        )?.toFixed(2)}{" "}
                        %{" "}
                      </h5>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link>
                        <p>Total Available</p>

                        <div class="topbar_left">
                          <p>
                            {(properties?.Commercial
                              ?.availablenoexpressionofinterest || 0) +
                              (properties?.Commercial
                                ?.availableexpressionofinterest || 0) || 0}
                          </p>
                          <h5 className="percentage">
                            {" "}
                            {(() => {
                              const availableEOI =
                                properties?.Commercial
                                  ?.availableexpressionofinterest || 0;
                              const availableNoEOI =
                                properties?.Commercial
                                  ?.availablenoexpressionofinterest || 0;
                              const total = availableEOI + availableNoEOI;

                              return total > 0
                                ? (
                                    (total / properties?.Commercial?.total) *
                                    100
                                  ).toFixed(2)
                                : "0.00";
                            })()}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Available No Expression of Interest">
                        <p>Available - Expression of No interest</p>

                        <div class="topbar_left">
                          <p>
                            {properties?.Commercial
                              ?.availablenoexpressionofinterest || 0}
                          </p>
                          <h5>
                            {(() => {
                              const availableEOI =
                                properties?.Commercial
                                  ?.availableexpressionofinterest || 0;
                              const availableNoEOI =
                                properties?.Commercial
                                  ?.availablenoexpressionofinterest || 0;
                              const total = availableEOI + availableNoEOI;

                              return total > 0
                                ? ((availableNoEOI / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Available Expression of interest">
                        <p>Available - Expression of interest</p>
                        <div class="topbar_left">
                          <p>
                            {properties?.Commercial
                              ?.availableexpressionofinterest || 0}
                          </p>

                          <h5>
                            {(() => {
                              const availableEOI =
                                properties?.Commercial
                                  ?.availableexpressionofinterest || 0;
                              const availableNoEOI =
                                properties?.Commercial
                                  ?.availablenoexpressionofinterest || 0;
                              const total = availableEOI + availableNoEOI;

                              return total > 0
                                ? ((availableEOI / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>

                    {/* <li>
                      <Link to="/properties?type=Commercial&status=Expression of Interest">
                        {" "}
                        <p>Expression of Interest</p>
                        <p>
                          {properties?.Commercial?.expressionofinterest || 0}
                        </p>
                      </Link>
                    </li> */}
                    <li>
                      <Link>
                        <p>Total Booked </p>
                        <div class="topbar_left">
                          <p>
                            {(properties?.Commercial
                              ?.bookedtokenamountnotpaid || 0) +
                              (properties?.Commercial?.bookedtokenamountpaid ||
                                0) +
                              (properties?.Commercial
                                ?.bookedpartialpaymentmade || 0) +
                              (properties?.Commercial?.bookedtotalpaymentmade ||
                                0) || 0}
                          </p>
                          <h5>
                            {(
                              (((properties?.Commercial
                                ?.bookedtokenamountnotpaid || 0) +
                                (properties?.Commercial
                                  ?.bookedtokenamountpaid || 0) +
                                (properties?.Commercial
                                  ?.bookedpartialpaymentmade || 0) +
                                (properties?.Commercial
                                  ?.bookedtotalpaymentmade || 0)) /
                                (properties?.Commercial?.total || 1)) *
                              100
                            ).toFixed(2)}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Token Amount not paid">
                        {" "}
                        <div class="list_right">
                          <p style={{ color: "red" }}>C1.</p>
                          <p>Booked - Token Amount not paid</p>
                        </div>
                        <div class="topbar_left">
                          <p>
                            {properties?.Commercial?.bookedtokenamountnotpaid ||
                              0}
                          </p>
                          <h5>
                            {(() => {
                              const tokenNotPaid =
                                properties?.Commercial
                                  ?.bookedtokenamountnotpaid || 0;
                              const tokenPaid =
                                properties?.Commercial?.bookedtokenamountpaid ||
                                0;
                              const partialPaid =
                                properties?.Commercial
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Commercial
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((tokenNotPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Token amount paid">
                        {" "}
                        <div class="list_right">
                          <p style={{ color: "red" }}>C2.</p>
                          <p>Booked - Token Amount paid</p>
                        </div>
                        <div class="topbar_left">
                          <p>
                            {properties?.Commercial?.bookedtokenamountpaid || 0}
                          </p>
                          <h5>
                            {(() => {
                              const tokenPaid =
                                properties?.Commercial?.bookedtokenamountpaid ||
                                0;
                              const tokenNotPaid =
                                properties?.Commercial
                                  ?.bookedtokenamountnotpaid || 0;
                              const partialPaid =
                                properties?.Commercial
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Commercial
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((tokenPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Partial payment made">
                        <div class="list_right">
                          <p style={{ color: "red" }}>C3.</p>
                          <p>Booked - Partial payment made</p>
                        </div>

                        <div class="topbar_left">
                          <p>
                            {properties?.Commercial?.bookedpartialpaymentmade ||
                              0}
                          </p>
                          <h5>
                            {(() => {
                              const tokenNotPaid =
                                properties?.Commercial
                                  ?.bookedtokenamountnotpaid || 0;
                              const tokenPaid =
                                properties?.Commercial?.bookedtokenamountpaid ||
                                0;
                              const partialPaid =
                                properties?.Commercial
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Commercial
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((partialPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties?type=Commercial&status=Booked - Total payment made">
                        {" "}
                        <div class="list_right">
                          <p style={{ color: "red" }}>C4.</p>
                          <p>Booked - Total payment made</p>
                        </div>
                        <div class="topbar_left">
                          <p>
                            {properties?.Commercial?.bookedtotalpaymentmade ||
                              0}
                          </p>

                          <h5>
                            {(() => {
                              const tokenNotPaid =
                                properties?.Commercial
                                  ?.bookedtokenamountnotpaid || 0;
                              const tokenPaid =
                                properties?.Commercial?.bookedtokenamountpaid ||
                                0;
                              const partialPaid =
                                properties?.Commercial
                                  ?.bookedpartialpaymentmade || 0;
                              const totalPaid =
                                properties?.Commercial
                                  ?.bookedtotalpaymentmade || 0;

                              const total =
                                tokenNotPaid +
                                tokenPaid +
                                partialPaid +
                                totalPaid;

                              return total > 0
                                ? ((totalPaid / total) * 100).toFixed(2)
                                : "0.00";
                            })()}{" "}
                            %
                          </h5>
                        </div>
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
            </div>
          </div>
        </div>
      </MainPanel>
    </>
  );
};

export default Dashboard;

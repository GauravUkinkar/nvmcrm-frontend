import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const Dashboard = () => {
  const columns = [
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Login time", dataIndex: "loginTime", key: "loginTime" },
    { title: "Login date", dataIndex: "loginDate", key: "loginDate" },
    { title: "Logout time", dataIndex: "logoutTime", key: "logoutTime" },
    
  ];

  const data = [
    {
      key: "1",
      user: "ashok_dhas",
      loginTime: "10:28 am",
      loginDate: "11 Aug 2025",
      logoutTime: "still logged in",
    },
    {
      key: "2",
      user: "ashok_dhas",
      loginTime: "05:33 pm",
      loginDate: "8 Aug 2025",
      logoutTime: "still logged in",
    },
  ];

  return (
    <MainPanel>
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <Table data={data} columns={columns} />
    </div>
    </MainPanel>
  );
};

export default Dashboard;
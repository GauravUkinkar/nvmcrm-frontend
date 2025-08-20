import React, { useEffect, useState } from "react";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Table from "../../comp/table/Table";
import { loginLogsGetAll } from "../../(api)/Dashboard";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";

const LoginLog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllLogin();
  }, []);

  const getAllLogin = async () => {
    try {
      setLoading(true);
      const response = await loginLogsGetAll();
      if (response.status === "OK") {
        setData(response.data.reverse());
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "User Name", dataIndex: "username", key: "username" },
    { title: "Login Time", dataIndex: "loginTime", key: "loginTime" },
    { title: "Login Date", dataIndex: "loginDate", key: "loginDate" },
    { title: "Logout Time", dataIndex: "logoutTime", key: "logoutTime" },
  ];
  return (
    <>
      {loading && <Loader />}
      <MainPanel length={data?.length} text="Login Logs">
        <Table data={data} columns={columns} />
      </MainPanel>
    </>
  );
};

export default LoginLog;

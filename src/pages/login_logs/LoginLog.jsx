import React, { useEffect, useState } from "react";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Table from "../../comp/table/Table";
import { loginLogsGetAll } from "../../(api)/Dashboard";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";

const LoginLog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1, // AntD uses 1-based page index
    pageSize: 10,
    total: 0,
  });

  
 useEffect(() => {
    getAllLogin(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const getAllLogin = async (page,size) => {
    try {
      setLoading(true);
      const response = await loginLogsGetAll(page - 1, size);
      if (response.status === "OK") {
        setData(response.data.reverse());
        setPagination((prev) => ({
          ...prev,
          total: response.totalItems, // API must return total records
        }));
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (paginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }));
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
        <Table
          data={data}
          columns={columns}
          pagination={pagination}
          handleChange={handleChange}
        />
      </MainPanel>
    </>
  );
};

export default LoginLog;

import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { activityLogsGetAll } from "../../(api)/ActivityLogs";
import ExportDataToExcel from "../../comp/export_data/ExportData";

const ActivityLogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1, // AntD uses 1-based page index
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getAllActivity(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const getAllActivity = async (page, size) => {
    try {
      setLoading(true);
      const response = await activityLogsGetAll(page - 1, size);
      if (response.status === "OK") {
        setData(response.data?.reverse());
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Id", dataIndex: "aid", key: "aid" },
    { title: "Changed by", dataIndex: "changedBy", key: "changedBy" },
    { title: "Changed in", dataIndex: "changedIn", key: "changedIn" },
    { title: "Database Name", dataIndex: "tableName", key: "tableName" },
    {
      title: "Changed Field Name",
      dataIndex: "changedFieldName",
      key: "changedFieldName",
    },
    { title: "Changed Time", dataIndex: "changedTime", key: "changedTime" },
    { title: "Changed date", dataIndex: "changedDate", key: "changedDate" },
    { title: "Activity Type", dataIndex: "activityType", key: "activityType" },
  ];

  const handleChange = (paginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    }));
  };

  return (
    <>
      {loading && <Loader />}
      <MainPanel length={data?.length} text="Activity Logs">
        <div>
          <button
            style={{ marginBottom: "10px" }}
            class="btn"
            onClick={() => ExportDataToExcel(data, "ActivityLogs")}
          >
            Export Data
          </button>

          <Table
            data={data}
            columns={columns}
            pagination={pagination}
            handleChange={handleChange}
          />
        </div>
      </MainPanel>
    </>
  );
};

export default ActivityLogs;

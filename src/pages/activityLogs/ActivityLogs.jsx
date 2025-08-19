import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { activityLogsGetAll } from "../../(api)/ActivityLogs";
import ExportDataToExcel from "../../comp/export_data/ExportData";

const ActivityLogs = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllActivity();
  }, []);

  const getAllActivity = async () => {
    try {
      setLoading(true);
      const response = await activityLogsGetAll();
      if (response.status === "OK") {
        setData(response.data);
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

  return (
    <>
      {loading && <Loader />}
      <MainPanel>
        <div>
          <button
            style={{ marginBottom: "10px" }}
            class="btn"
            onClick={() => ExportDataToExcel(data, "ActivityLogs")}
          >
            Export Data
          </button>

          {data?.length > 0 && (
            <Table data={data.reverse()} columns={columns} />
          )}
        </div>
      </MainPanel>
    </>
  );
};

export default ActivityLogs;

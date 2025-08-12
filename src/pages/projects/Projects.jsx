import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const Projects = () => {
  const columns = [
    { title: "Serial no.", dataIndex: "serialNo", key: "serialNo" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated time", dataIndex: "updatedTime", key: "updatedTime" },
    { title: "Updated date", dataIndex: "updatedDate", key: "updatedDate" },
  ];

  const data = [
    {
      key: "1",
      serialNo: 1,
      projectName: "Project Alpha",
      updatedBy: "ashok_dhas",
      updatedTime: "9:02 AM",
      updatedDate: "2025-08-08",
    },
    {
      key: "2",
      serialNo: 2,
      projectName: "Project Beta",
      updatedBy: "ashok_dhas",
      updatedTime: "8:44 AM",
      updatedDate: "2025-08-08",
    },
  ];

  return (
    <MainPanel>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 40,
        }}
      >
        
        <input
          id="projectName"
          type="text"
          placeholder="Enter project name"
          style={{ flex: 1, padding: "6px 8px", fontSize: 16 }}
        />
        <button
          style={{
            padding: "8px 16px",
            fontSize: 16,
            cursor: "pointer",
            backgroundColor: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Add Project
        </button>
      </div>

      <Table
        data={data}
        columns={columns}
        showActions={true}
        onEdit={(record) => console.log("Edit", record)}
        onDelete={(record) => console.log("Delete", record)}
      />
    </MainPanel>
  );
};

export default Projects;

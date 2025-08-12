import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const ActionItems = () => {
  const columns = [
    { title: "Serial No.", dataIndex: "serialNo", key: "serialNo" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Action Item Desc.", dataIndex: "actionItemDesc", key: "actionItemDesc" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Estimated Completion Date", dataIndex: "estimatedCompletionDate", key: "estimatedCompletionDate" },
    { title: "Owner", dataIndex: "owner", key: "owner" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Update time", dataIndex: "updateTime", key: "updateTime" },
    { title: "Updated date", dataIndex: "updatedDate", key: "updatedDate" },
    
  ];

  const data = [
    {
      key: "1",
      serialNo: 1,
      projectSubtitle: "Phase 1",
      projectName: "Website Redesign",
      actionItemDesc: "Update homepage banner",
      status: "In Progress",
      estimatedCompletionDate: "2025-08-15",
      owner: "John Doe",
      comments: "Waiting for design approval",
      updatedBy: "ashok_dhas",
      updateTime: "9:02 AM",
      updatedDate: "2025-08-08",
      action: "Edit/Delete",
    },
    {
      key: "2",
      serialNo: 2,
      projectSubtitle: "Phase 2",
      projectName: "Mobile App Launch",
      actionItemDesc: "Test payment integration",
      status: "Completed",
      estimatedCompletionDate: "2025-08-10",
      owner: "Jane Smith",
      comments: "All tests passed",
      updatedBy: "ashok_dhas",
      updateTime: "8:44 AM",
      updatedDate: "2025-08-08",
      action: "Edit/Delete",
    },
  ];

  return (
    <MainPanel>
      <div>
        <Table
          data={data}
          columns={columns}
          showActions={true}
          onEdit={(record) => console.log("Edit", record)}
          onDelete={(record) => console.log("Delete", record)}
        />
      </div>
    </MainPanel>
  );
};

export default ActionItems;

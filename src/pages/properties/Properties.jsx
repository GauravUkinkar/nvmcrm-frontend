import React from 'react'
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const Properties = () => {
    const columns = [
        { title: "Serial No.", dataIndex: "serialNo", key: "serialNo" },
        { title: "Changed by", dataIndex: "changedBy", key: "changedBy" },
        { title: "Changed in", dataIndex: "changedIn", key: "changedIn" },
        { title: "Database Name", dataIndex: "databaseName", key: "databaseName" },
        {
          title: "Changed Field Id",
          dataIndex: "changedFieldId",
          key: "changedFieldId",
        },
        { title: "Changed time", dataIndex: "changedTime", key: "changedTime" },
        { title: "Changed date", dataIndex: "changedDate", key: "changedDate" },
      ];
    
      const data = [
        {
          key: "1",
          serialNo: 1,
          changedBy: "ashok_dhas",
          changedIn: "profession",
          databaseName: "Client",
          changedFieldId: "20185830",
          changedTime: "9:02 AM",
          changedDate: "2025-08-08",
        },
        {
          key: "2",
          serialNo: 2,
          changedBy: "ashok_dhas",
          changedIn: "broker-code",
          databaseName: "Client",
          changedFieldId: "20185830",
          changedTime: "8:44 AM",
          changedDate: "2025-08-08",
        },
      ];
  return (
    <MainPanel>
      <div>
        <Table
          data={data}
          columns={columns}
          showActions={false} 
          onEdit={(record) => console.log("Edit", record)}
          onDelete={(record) => console.log("Delete", record)}
        />
      </div>
    </MainPanel>
  )
}

export default Properties
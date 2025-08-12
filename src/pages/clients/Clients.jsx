import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const Clients = () => {
  const columns = [
    { title: "Serial No.", dataIndex: "serialNo", key: "serialNo" },
    { title: "Client ID", dataIndex: "clientId", key: "clientId" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Client Name", dataIndex: "clientName", key: "clientName" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "Alternate Mobile Number", dataIndex: "altMobileNumber", key: "altMobileNumber" },
    { title: "Client Email", dataIndex: "clientEmail", key: "clientEmail" },
    { title: "Profession", dataIndex: "profession", key: "profession" },
    { title: "PAN Number", dataIndex: "panNumber", key: "panNumber" },
    { title: "Aadhar Number", dataIndex: "aadharNumber", key: "aadharNumber" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Broker Name", dataIndex: "brokerName", key: "brokerName" },
    { title: "Last Updated by", dataIndex: "lastUpdatedBy", key: "lastUpdatedBy" },
    { title: "Last Updated date", dataIndex: "lastUpdatedDate", key: "lastUpdatedDate" },
    { title: "Last Updated time", dataIndex: "lastUpdatedTime", key: "lastUpdatedTime" },
  ];

  const data = [
    {
      key: "1",
      serialNo: 1,
      clientId: "CL001",
      projectSubtitle: "Luxury Villas",
      projectName: "Palm Residency",
      clientName: "Amit Verma",
      dob: "1985-07-12",
      address: "123 MG Road, Bangalore",
      mobileNumber: "9876543210",
      altMobileNumber: "9123456789",
      clientEmail: "amit.verma@example.com",
      profession: "Entrepreneur",
      panNumber: "ABCDE1234F",
      aadharNumber: "123456789012",
      comments: "Interested in premium villas",
      brokerName: "Ravi Kumar",
      lastUpdatedBy: "admin",
      lastUpdatedDate: "2025-08-08",
      lastUpdatedTime: "09:02 AM",
    },
    {
      key: "2",
      serialNo: 2,
      clientId: "CL002",
      projectSubtitle: "Commercial Complex",
      projectName: "Tech Tower",
      clientName: "Neha Sharma",
      dob: "1990-03-05",
      address: "456 Park Street, Mumbai",
      mobileNumber: "9988776655",
      altMobileNumber: "9112233445",
      clientEmail: "neha.sharma@example.com",
      profession: "IT Consultant",
      panNumber: "XYZAB9876P",
      aadharNumber: "987654321098",
      comments: "Looking for office space",
      brokerName: "Anil Singh",
      lastUpdatedBy: "manager",
      lastUpdatedDate: "2025-08-09",
      lastUpdatedTime: "10:15 AM",
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

export default Clients;

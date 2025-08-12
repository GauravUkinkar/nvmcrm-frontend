import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const Employees = () => {
  const columns = [
    { title: "Serial No", dataIndex: "serialNo", key: "serialNo" },
    { title: "Employee Code", dataIndex: "employeeCode", key: "employeeCode" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Employee Name", dataIndex: "employeeName", key: "employeeName" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Employee Status", dataIndex: "employeeStatus", key: "employeeStatus" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Date of joining", dataIndex: "dateOfJoining", key: "dateOfJoining" },
    { title: "Date of leaving", dataIndex: "dateOfLeaving", key: "dateOfLeaving" },
    { title: "Contact Number", dataIndex: "contactNumber", key: "contactNumber" },
    { title: "Alternate Contact Number", dataIndex: "altContactNumber", key: "altContactNumber" },
    { title: "Mail ID", dataIndex: "mailId", key: "mailId" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
    { title: "Account Number", dataIndex: "accountNumber", key: "accountNumber" },
    { title: "IFSC Code", dataIndex: "ifscCode", key: "ifscCode" },
    { title: "AADHAR Number", dataIndex: "aadharNumber", key: "aadharNumber" },
    { title: "PAN Number", dataIndex: "panNumber", key: "panNumber" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Monthly Salary", dataIndex: "monthlySalary", key: "monthlySalary" },
    { title: "CTC", dataIndex: "ctc", key: "ctc" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated time", dataIndex: "updatedTime", key: "updatedTime" },
  ];

  const data = [
    {
      key: "1",
      serialNo: 1,
      employeeCode: "EMP001",
      projectSubtitle: "Infra Development",
      projectName: "Smart City Project",
      employeeName: "Rajesh Sharma",
      gender: "Male",
      employeeStatus: "Active",
      designation: "Project Manager",
      dateOfJoining: "2020-05-15",
      dateOfLeaving: "",
      contactNumber: "9876543210",
      altContactNumber: "9123456780",
      mailId: "rajesh@example.com",
      dob: "1988-04-22",
      bankName: "HDFC Bank",
      accountNumber: "1234567890",
      ifscCode: "HDFC0001234",
      aadharNumber: "123456789012",
      panNumber: "ABCDE1234F",
      comments: "Key project lead",
      monthlySalary: "80,000",
      ctc: "9,60,000",
      updatedBy: "admin",
      updatedDate: "2025-08-08",
      updatedTime: "09:02 AM",
    },
    {
      key: "2",
      serialNo: 2,
      employeeCode: "EMP002",
      projectSubtitle: "Residential Project",
      projectName: "Green Heights",
      employeeName: "Priya Mehta",
      gender: "Female",
      employeeStatus: "On Leave",
      designation: "Architect",
      dateOfJoining: "2021-01-10",
      dateOfLeaving: "",
      contactNumber: "9988776655",
      altContactNumber: "9112233445",
      mailId: "priya@example.com",
      dob: "1990-09-12",
      bankName: "SBI",
      accountNumber: "9876543210",
      ifscCode: "SBIN0000456",
      aadharNumber: "987654321098",
      panNumber: "XYZAB9876P",
      comments: "Design lead",
      monthlySalary: "65,000",
      ctc: "7,80,000",
      updatedBy: "manager",
      updatedDate: "2025-08-09",
      updatedTime: "10:15 AM",
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

export default Employees;

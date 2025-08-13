import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import { brokerGetAll } from "../../(api)/BrokerApi";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";

const Brokers = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      setLoading(true);
      const response = brokerGetAll();
      setData(response.data);


  
      
    } catch (err) {
      setError(err);
      toast.error("Something went wrong")
   

    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Serial No", dataIndex: "serialNo", key: "serialNo" },
    { title: "Broker Code", dataIndex: "brokerCode", key: "brokerCode" },
    { title: "Broker Name", dataIndex: "brokerName", key: "brokerName" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Alternate Contact Number",
      dataIndex: "altContactNumber",
      key: "altContactNumber",
    },
    { title: "Broker E-mail", dataIndex: "email", key: "email" },
    { title: "PAN Number", dataIndex: "panNumber", key: "panNumber" },
    { title: "AADHAR Number", dataIndex: "aadharNumber", key: "aadharNumber" },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    { title: "IFSC Code", dataIndex: "ifscCode", key: "ifscCode" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated time", dataIndex: "updatedTime", key: "updatedTime" },
  ];

  const data2 = [
    {
      key: "1",
      serialNo: 1,
      brokerCode: "BR001",
      brokerName: "Ashok Dhas",
      dob: "1985-06-15",
      address: "Pune, Maharashtra",
      contactNumber: "9876543210",
      altContactNumber: "9123456780",
      email: "ashok@example.com",
      panNumber: "ABCDE1234F",
      aadharNumber: "123456789012",
      bankName: "SBI",
      accountNumber: "1234567890",
      ifscCode: "SBIN0000456",
      comments: "Active broker",
      updatedBy: "admin",
      updatedDate: "2025-08-08",
      updatedTime: "09:02 AM",
    },
    {
      key: "2",
      serialNo: 2,
      brokerCode: "BR002",
      brokerName: "Ravi Kumar",
      dob: "1990-03-22",
      address: "Mumbai, Maharashtra",
      contactNumber: "9988776655",
      altContactNumber: "9112233445",
      email: "ravi@example.com",
      panNumber: "XYZAB9876P",
      aadharNumber: "987654321098",
      bankName: "HDFC Bank",
      accountNumber: "9876543210",
      ifscCode: "HDFC0001234",
      comments: "Pending KYC",
      updatedBy: "manager",
      updatedDate: "2025-08-09",
      updatedTime: "10:15 AM",
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <MainPanel>
        <div>
          <Table
            data={data2}
            columns={columns}
            showActions={true}
            onEdit={(record) => console.log("Edit", record)}
            onDelete={(record) => console.log("Delete", record)}
          />
        </div>
      </MainPanel>
    </>
  );
};

export default Brokers;

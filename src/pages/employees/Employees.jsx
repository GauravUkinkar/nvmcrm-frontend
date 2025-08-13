import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import { employeeGetAll } from "../../(api)/Employee";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";

const Employees = () => {
  const [data, setData] = useState();
     const [loading, setLoading] = useState(false);
   
     useEffect(() => {
      getAllEmplyoee();
     }, []);
   
     const getAllEmplyoee = async () => {
       try {
         setLoading(true);
          const response = await employeeGetAll();
       if(response.status==="OK"){
         setData(response.data);
       }
       } catch (err) {
         toast.error("Something went wrong");
       } finally {
         setLoading(false);
   
       }
     };

  const columns = [   
    { title: "Employee Id", dataIndex: "empId", key: "empId" },
    { title: "Employee Name", dataIndex: "empName", key: "empName" },
    { title: "User Name", dataIndex: "userName", key: "userName" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Project Subtitles", dataIndex: "projectSubtitles", key: "projectSubtitles" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Employee Status", dataIndex: "employeeStatus", key: "employeeStatus" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Date Of Joining", dataIndex: "dateOfJoining", key: "dateOfJoining" },
    { title: "Date Of Leaving", dataIndex: "dateOfLeaving", key: "dateOfLeaving" },
    { title: "Contact Number", dataIndex: "contactNo", key: "contactNo" },
    { title: "Alternate Contact Number", dataIndex: "alternateConNo", key: "alternateConNo" },
    { title: "Email", dataIndex: "mailId", key: "mailId" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
    { title: "Account Number", dataIndex: "accountNo", key: "accountNo" },
    { title: "IFSC Code", dataIndex: "ifscCode", key: "ifscCode" },
    { title: "Aadhar Card", dataIndex: "aadharCard", key: "aadharCard" },
    { title: "PAN Number", dataIndex: "panNo", key: "panNo" },
    { title: "Comments", dataIndex: "commennts", key: "commennts" },
    { title: "Monthly Salary", dataIndex: "monthlySalary", key: "monthlySalary" },
    { title: "CTC", dataIndex: "ctc", key: "ctc" },
    { title: "Added by", dataIndex: "addedBy", key: "addedBy" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Added Date", dataIndex: "addedDate", key: "addedDate" },
    { title: "Updated Date", dataIndex: "updatedDate", key: "updatedDate" },
  ];
  

  return (
    <>
    {loading && <Loader />}
    <MainPanel>
      <div>
      {data?.length > 0 && (
          <Table
          data={data}
          columns={columns}
          showActions={true}
          onEdit={(record) => console.log("Edit", record)}
          onDelete={(record) => console.log("Delete", record)}
        />
        )}
      </div>
    </MainPanel>
    
    
    
    </>
  );
};

export default Employees;

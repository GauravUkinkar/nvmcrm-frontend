import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import { deleteEmployee, employeeGetAll } from "../../(api)/Employee";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";

const Employees = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  //  navigate----------------
  const navigate = useNavigate()
  useEffect(() => {
    getAllEmplyoee();
  }, []);

  const edit = (Id) => {
    navigate(`/addemployee?eid=${Id}`)
  }

  const getAllEmplyoee = async () => {
    try {
      setLoading(true);
      const response = await employeeGetAll();
      if (response.status === "OK") {
        setData(response.data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);

    }
  };

  const deleteId = async (eid) => {
    try {
      setLoading(true);
      const response = await deleteEmployee(eid);
      if (response.status === "OK") {
        toast.success("Successfully Deleted!!");
        getAllEmplyoee();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setDeletePopup(false);
    }
  };

  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    title: "",
    desc: "",
    bid: "",
  });

  const deleteDialog = (id) => {
    setDeleteInfo({
      ...deleteInfo,
      title: "Are you sure?",
      desc: `You want to delete the item with bid: ${id}`,
      bid: id,
    });
    setDeletePopup(true);
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
      {deletePopup && (
        <DeleteConfirmation
          title={deleteInfo.title}
          desc={deleteInfo.desc}
          yesfunc={() => deleteId(deleteInfo.bid)}
          nofunc={() => setDeletePopup(false)}
        />
      )}
      {loading && <Loader />}
      <MainPanel>
        <div>
          {data?.length > 0 && (
            <Table
              data={data}
              columns={columns}
              showActions={true}
              onEdit={(record) => edit(record.eid)}
              onDelete={(record) => deleteDialog(record.eid)}
            />
          )}
        </div>
      </MainPanel>



    </>
  );
};

export default Employees;

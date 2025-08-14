import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import { brokerGetAll, deleteBroker } from "../../(api)/BrokerApi";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";

const Brokers = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  //navigate----------------------------------------------
const navigate=useNavigate()
const edit= (Id) => {
  navigate(`/brokers?bid=${Id}`)
    }

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      setLoading(true);
      const response = await brokerGetAll();
      if (response.status === "OK") {
        setData(response.data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteId = async (bid) => {
    try {
      setLoading(true);
      const response = await deleteBroker(bid);
      if (response.status === "OK") {
        toast.success("Successfully Deleted!!");
        getAll();
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
    { title: "Id", dataIndex: "bid", key: "bid" },
    { title: "Broker Name", dataIndex: "brokerName", key: "brokerName" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Contact Number", dataIndex: "contactNo", key: "contactNo" },
    {
      title: "Alternate Number",
      dataIndex: "alternateConNo",
      key: "alternateConNo",
    },
    {
      title: "Email",
      dataIndex: "mailId",
      key: "mailId",
    },
    { title: "PAN Number", dataIndex: "panNo", key: "panNo" },
    { title: "Aadhar Number", dataIndex: "aadharNo", key: "aadharNo" },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
    { title: "Account Number", dataIndex: "accountNo", key: "accountNo" },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
      key: "ifscCode",
    },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Added By", dataIndex: "addedBy", key: "addedBy" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Added date", dataIndex: "addedDate", key: "addedDate" },
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
              onEdit={(record) => edit(record.bid)}
              onDelete={(record) => deleteDialog(record.bid)}
            />
          )}
        </div>
      </MainPanel>
    </>
  );
};

export default Brokers;

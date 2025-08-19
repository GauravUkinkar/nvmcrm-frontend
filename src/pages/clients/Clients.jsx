import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { clientGetAll, deleteClient } from "../../(api)/Client";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";
import ExportDataToExcel from "../../comp/export_data/ExportData";

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //navigate----------------------------------------------
  const navigate = useNavigate();
  const edit = (Id) => {
    navigate(`/addclients?cid=${Id}`);
  };

  useEffect(() => {
    getAllClient();
  }, []);

  const getAllClient = async () => {
    try {
      setLoading(true);
      const response = await clientGetAll();
      if (response.status === "OK") {
        setData(response.data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteId = async (cid) => {
    try {
      setLoading(true);
      const response = await deleteClient(cid);
      if (response.status === "OK") {
        toast.success("Successfully Deleted!!");
        getAllClient();
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
    { title: "Id", dataIndex: "cid", key: "cid" },

    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    {
      title: "Project Subtitle",
      dataIndex: "projectSubtitle",
      key: "pprojectSubtitle",
    },
    { title: "Client Name", dataIndex: "clientName", key: "clientName" },
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Alternate Mobile Number",
      dataIndex: "alternateMobNo",
      key: "alternateMobNo",
    },
    { title: "Client Email", dataIndex: "clientEmail", key: "clientEmail" },
    { title: "Profession", dataIndex: "proffession", key: "proffession" },
    { title: "PAN Number", dataIndex: "panNo", key: "panNo" },
    { title: "Aadhar Number", dataIndex: "aadharNo", key: "aadharNo" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Broker Name", dataIndex: "brokerName", key: "brokerName" },
    {
      title: "Marketing Executive",
      dataIndex: "marketingExecutive",
      key: "marketingExecutive",
    },

    { title: "Added by", dataIndex: "addedBy", key: "addedBy" },

    { title: "Added Date", dataIndex: "addedDate", key: "addedDate" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated Date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated Time", dataIndex: "updatedTime", key: "updatedTime" },
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
      <MainPanel length={data?.length} text="Clients">
        <div>
          <button
            style={{ marginBottom: "10px" }}
            class="btn"
            onClick={() => ExportDataToExcel(data, "Clients")}
          >
            Export Data
          </button>
         
            <Table
              data={data}
              columns={columns}
              showActions={true}
              onEdit={(record) => edit(record.cid)}
              onDelete={(record) => deleteDialog(record.cid)}
            />
       
        </div>
      </MainPanel>
    </>
  );
};

export default Clients;

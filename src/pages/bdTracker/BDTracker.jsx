import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { bdTrackerGetAll, deleteBDTracker } from "../../(api)/BdTracker";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";

const BDTracker = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  //navigate----------------------------------------------
  const navigate = useNavigate();
  const edit = (Id) => {
    navigate(`/addBdTracker?bdId=${Id}`);
  };

  useEffect(() => {
    getAllBd();
  }, []);

  const getAllBd = async () => {
    try {
      setLoading(true);
      const response = await bdTrackerGetAll();
      if (response.status === "OK") {
        setData(response.data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteId = async (bdId) => {
    try {
      setLoading(true);
      const response = await deleteBDTracker(bdId);
      if (response.status === "OK") {
        toast.success("Successfully Deleted!!");
        getAllBd();
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
    { title: "Tracker Id", dataIndex: "bdId", key: "bdId" },
    /*  { title: "Tracker Id", dataIndex: "trackerId", key: "trackerId" }, */
    {
      title: "Project Subtitle",
      dataIndex: "projectSubtitle",
      key: "projectSubtitle",
    },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    {
      title: "Lead Generation Date",
      dataIndex: "leadGenerationDate",
      key: "leadGenerationDate",
    },
    {
      title: "Potential Client Name",
      dataIndex: "potentialClientName",
      key: "potentialClientName",
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Email", dataIndex: "emailId", key: "emailId" },
    { title: "Phone Number", dataIndex: "phoneNo", key: "phoneNo" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    {
      title: "Date of Future Contact",
      dataIndex: "dateOfFutureContact",
      key: "dateOfFutureContact",
    },
    {
      title: "Marketing Executive",
      dataIndex: "marketingExecutive",
      key: "marketingExecutive",
    },
    {
      title: "Date of emailing the Business Proposal to Potential Client",
      dataIndex: "dateofemailingtheBusinessProposaltoPotentialClient",
      key: "dateofemailingtheBusinessProposaltoPotentialClient",
    },
    {
      title: "Future date to Proceed on Business Proposal",
      dataIndex: "futuredatetoproceedonBusinessProposal",
      key: "futuredatetoproceedonBusinessProposal",
    },
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
      <MainPanel>
        <div>
          {data?.length > 0 && (
            <Table
              data={data}
              columns={columns}
              showActions={true}
              onEdit={(record) => edit(record.bdId)}
              onDelete={(record) => deleteDialog(record.bdId)}
            />
          )}
        </div>
      </MainPanel>
    </>
  );
};

export default BDTracker;

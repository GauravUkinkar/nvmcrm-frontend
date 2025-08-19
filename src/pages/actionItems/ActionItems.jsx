import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { actionGetAll, deleteAction } from "../../(api)/ActionItems";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";
import ExportDataToExcel from "../../comp/export_data/ExportData";

const ActionItems = () => {
   const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

      //navigate----------------------------------------------
const navigate=useNavigate()
const edit= (Id) => {
  navigate(`/addactionitems?aid=${Id}`)
    }

  

  useEffect(() => {
    getAllAction();
      }, []);
    
      const getAllAction = async () => {
        try {
          setLoading(true);
           const response = await actionGetAll();
        if(response.status==="OK"){
          setData(response.data);
        }
        } catch (err) {
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
    
        }
      };

      const deleteId = async (aid) => {
              try {
                setLoading(true);
                const response = await deleteAction(aid);
                if (response.status === "OK") {
                  toast.success("Successfully Deleted!!");
                  getAllAction();
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
        { title: "Serial No.", dataIndex: "aid", key: "aid" },
        { title: "Project Name", dataIndex: "projectName", key: "projectName" },
        { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
        { title: "Action Item Description", dataIndex: "actionItemDescription", key: "actionItemDescription" },
        { title: "Action Item Status", dataIndex: "actionItemStatus", key: "actionItemStatus" },
        { title: "Action Owner", dataIndex: "actionOwner", key: "actionOwner" },
        { title: "Action Completeion Date", dataIndex: "actionCompleteionDate", key: "actionCompleteionDate" },
        { title: "Comments", dataIndex: "comments", key: "comments" },
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
    <MainPanel  length={data?.length} text="Action Items" >
      <div>
          <button style={{marginBottom:"10px"}} class="btn" onClick={()=>ExportDataToExcel(data,"ActionItems")} >
            Export Data
          </button>
   
          <Table
          data={data}
          columns={columns}
          showActions={true}
          onEdit={(record) => edit(record.aid)}
          onDelete={(record) => deleteDialog(record.aid)}
        />
    
      </div>
    </MainPanel>
    
    
    
    </>
  );
};

export default ActionItems;

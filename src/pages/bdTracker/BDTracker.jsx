import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { bdTrackerGetAll } from "../../(api)/BdTracker";

const BDTracker = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

   useEffect(() => {
      getAllBd();
    }, []);
  
    const getAllBd = async () => {
      try {
        setLoading(true);
         const response = await bdTrackerGetAll();
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
    { title: "Id", dataIndex: "bdId", key: "bdId" },
    { title: "Tracker Id", dataIndex: "trackerId", key: "trackerId" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Lead Generation Date", dataIndex: "leadGenerationDate", key: "leadGenerationDate" },
    { title: "Potential Client Name", dataIndex: "potentialClientName", key: "potentialClientName" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Email", dataIndex: "emailId", key: "emailId" },
    { title: "Phone Number", dataIndex: "phoneNo", key: "phoneNo" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Date of Future Contact", dataIndex: "dateOfFutureContact", key: "dateOfFutureContact" },
    { title: "Marketing Executive", dataIndex: "marketingExecutive", key: "marketingExecutive" },
    { title: "Date of emailing the Business Proposal to Potential Client", dataIndex: "dateofemailingtheBusinessProposaltoPotentialClient", key: "dateofemailingtheBusinessProposaltoPotentialClient" }, 
    { title: "Future date to Proceed on Business Proposal", dataIndex: "futuredatetoproceedonBusinessProposal", key: "futuredatetoproceedonBusinessProposal" }, 
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated Date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated Time", dataIndex: "updatedTime", key: "updatedTime" },
    
    
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

export default BDTracker;

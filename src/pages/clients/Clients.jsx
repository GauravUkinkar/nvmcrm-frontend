import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { clientGetAll } from "../../(api)/Client";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const [data, setData] = useState();
   const [loading, setLoading] = useState(false);

    //navigate----------------------------------------------
const navigate=useNavigate()
const edit= (Id) => {
  navigate(`/addclients?cid=${Id}`)
    }
 
   useEffect(() => {
     getAllClient();
   }, []);
 
   const getAllClient = async () => {
     try {
       setLoading(true);
        const response = await clientGetAll();
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
    { title: "Id", dataIndex: "cid", key: "cid" },
    { title: "Client Name", dataIndex: "clientName", key: "clientName" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "pprojectSubtitle" },   
    { title: "Date of Birth", dataIndex: "dob", key: "dob" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Marketing Executive", dataIndex: "marketingExecutive", key: "marketingExecutive" },
    { title: "Alternate Mobile Number", dataIndex: "alternateMobNo", key: "alternateMobNo" },
    { title: "Client Email", dataIndex: "clientEmail", key: "clientEmail" },
    { title: "Proffession", dataIndex: "proffession", key: "proffession" },
    { title: "PAN Number", dataIndex: "panNo", key: "panNo" },
    { title: "Aadhar Number", dataIndex: "aadharNo", key: "aadharNo" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Broker Name", dataIndex: "brokerName", key: "brokerName" },
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
          onEdit={(record) => edit(record.cid)}
          onDelete={(record) => console.log("Delete", record)}
        />
        )}
      </div>
    </MainPanel>
    
    </>
  );
};

export default Clients;

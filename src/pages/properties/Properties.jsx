import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { propertyGetAll } from "../../(api)/Properties";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

   //navigate----------------------------------------------
const navigate=useNavigate()
const edit= (Id) => {
  navigate(`/addproperties?pid=${Id}`)
    }

   useEffect(() => {
    getAllProperty();
    }, []);
  
    const getAllProperty = async () => {
      try {
        setLoading(true);
         const response = await propertyGetAll();
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
    { title: "Id", dataIndex: "pid", key: "pid" },
    { title: "Plot No.", dataIndex: "plotNo", key: "plotNo" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Phase", dataIndex: "phase", key: "phase" },
    { title: "Plot Size (Sq. Ft)", dataIndex: "plotSize", key: "plotSize" },
    { title: "Rate per Sq Ft.", dataIndex: "ratePerSqFt", key: "ratePerSqFt" },
    { title: "Other Costs", dataIndex: "otherCosts", key: "otherCosts" },
    { title: "Total Rate of the plot", dataIndex: "totalRateOfPlot", key: "totalRateOfPlot" },
    { title: "Plot Development Status", dataIndex: "plotDevelopementStatus", key: "plotDevelopementStatus" },
    { title: "Plot Sale Status", dataIndex: "plotSaleStatus", key: "plotSaleStatus" },
    { title: "Plot Owner - Client ID", dataIndex: "plotOwner", key: "plotOwner" },
    { title: "Plot Financial Status", dataIndex: "plotFinancialStatus", key: "plotFinancialStatus" },
    { title: "Pending Amount Value (INR.)", dataIndex: "pendingAmmountValue", key: "pendingAmmountValue" },
    { title: "Registry Date", dataIndex: "registryDate", key: "registryDate" },
    { title: "Actual Possession Date", dataIndex: "actualPossessionDate", key: "actualPossessionDate" },
    { title: "Tentative Possession Date", dataIndex: "tentativePossessionDate", key: "tentativePossessionDate" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
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
        {data?.length  > 0 && (
          <Table
          data={data}
          columns={columns}
          showActions={true}
          onEdit={(record) => edit(record.pid)}
          onDelete={(record) => console.log("Delete", record)}
        />
        )}
      </div>
    </MainPanel>
    
    
    </>
  );
};

export default Properties;

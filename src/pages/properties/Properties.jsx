import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const Properties = () => {
  const columns = [
    { title: "Serial No", dataIndex: "serialNo", key: "serialNo" },
    { title: "Plot No.", dataIndex: "plotNo", key: "plotNo" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Phase", dataIndex: "phase", key: "phase" },
    { title: "Plot Size (Sq. Ft)", dataIndex: "plotSizeSqFt", key: "plotSizeSqFt" },
    { title: "Rate per Sq Ft.", dataIndex: "ratePerSqFt", key: "ratePerSqFt" },
    { title: "Other Costs", dataIndex: "otherCosts", key: "otherCosts" },
    { title: "Total Rate of the plot", dataIndex: "totalRate", key: "totalRate" },
    { title: "Plot Development Status", dataIndex: "plotDevelopmentStatus", key: "plotDevelopmentStatus" },
    { title: "Plot Sale Status", dataIndex: "plotSaleStatus", key: "plotSaleStatus" },
    { title: "Plot Owner - Client ID", dataIndex: "plotOwnerClientId", key: "plotOwnerClientId" },
    { title: "Plot Financial Status", dataIndex: "plotFinancialStatus", key: "plotFinancialStatus" },
    { title: "Pending Amount Value (INR.)", dataIndex: "pendingAmount", key: "pendingAmount" },
    { title: "Tentative Possession Date", dataIndex: "tentativePossessionDate", key: "tentativePossessionDate" },
    { title: "Registry Date", dataIndex: "registryDate", key: "registryDate" },
    { title: "Actual Possession Date", dataIndex: "actualPossessionDate", key: "actualPossessionDate" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated time", dataIndex: "updatedTime", key: "updatedTime" },
    
  ];

  const data = [
    {
      key: "1",
      serialNo: 1,
      plotNo: "P-101",
      projectSubtitle: "Luxury Villas",
      projectName: "Green Meadows",
      phase: "Phase 1",
      plotSizeSqFt: 2500,
      ratePerSqFt: 1500,
      otherCosts: 50000,
      totalRate: 3800000,
      plotDevelopmentStatus: "Completed",
      plotSaleStatus: "Sold",
      plotOwnerClientId: "CL-2025-001",
      plotFinancialStatus: "Fully Paid",
      pendingAmount: 0,
      tentativePossessionDate: "2025-12-01",
      registryDate: "2025-07-15",
      actualPossessionDate: "2025-08-01",
      comments: "Possession handed over successfully",
      updatedBy: "ashok_dhas",
      updatedDate: "2025-08-08",
      updatedTime: "09:02 AM",
      
    },
    {
      key: "2",
      serialNo: 2,
      plotNo: "P-102",
      projectSubtitle: "Luxury Villas",
      projectName: "Green Meadows",
      phase: "Phase 1",
      plotSizeSqFt: 2000,
      ratePerSqFt: 1400,
      otherCosts: 40000,
      totalRate: 2880000,
      plotDevelopmentStatus: "In Progress",
      plotSaleStatus: "Available",
      plotOwnerClientId: "N/A",
      plotFinancialStatus: "Pending Payment",
      pendingAmount: 500000,
      tentativePossessionDate: "2026-01-10",
      registryDate: "N/A",
      actualPossessionDate: "N/A",
      comments: "Client visiting next week",
      updatedBy: "ashok_dhas",
      updatedDate: "2025-08-08",
      updatedTime: "08:44 AM",
     
    },
  ];

  return (
    <MainPanel>
      <div>        
        <Table
          data={data}
          columns={columns}
          showActions={true}
          onEdit={(record) => console.log("Edit", record)}
          onDelete={(record) => console.log("Delete", record)}
        />
      </div>
    </MainPanel>
  );
};

export default Properties;

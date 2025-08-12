import React from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";

const BDTracker = () => {
  const columns = [
    { title: "Serial No", dataIndex: "serialNo", key: "serialNo" },
    { title: "Tracker Id", dataIndex: "trackerId", key: "trackerId" },
    { title: "Project Subtitle", dataIndex: "projectSubtitle", key: "projectSubtitle" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    { title: "Lead Generation Date", dataIndex: "leadGenerationDate", key: "leadGenerationDate" },
    { title: "Potential Client Name", dataIndex: "potentialClientName", key: "potentialClientName" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Email-Id", dataIndex: "emailId", key: "emailId" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Reference (Broker Name)", dataIndex: "referenceBrokerName", key: "referenceBrokerName" },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Date of Future Contact", dataIndex: "dateOfFutureContact", key: "dateOfFutureContact" },
    { title: "Marketing Executive", dataIndex: "marketingExecutive", key: "marketingExecutive" },
    { title: "Date of emailing the Business Proposal to Potential Client", dataIndex: "proposalEmailDate", key: "proposalEmailDate" },
    { title: "Future date to proceed on Business Proposal", dataIndex: "futureProposalDate", key: "futureProposalDate" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },
    { title: "Updated date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated time", dataIndex: "updatedTime", key: "updatedTime" },
    
  ];

  const data = [
    {
      key: "1",
      serialNo: 1,
      trackerId: "TRK-001",
      projectSubtitle: "Phase 1",
      projectName: "Website Redesign",
      leadGenerationDate: "2025-08-01",
      potentialClientName: "Acme Corp",
      status: "In Progress",
      emailId: "contact@acmecorp.com",
      phoneNumber: "+1 555-1234",
      referenceBrokerName: "John Broker",
      comments: "Awaiting design approval",
      dateOfFutureContact: "2025-08-15",
      marketingExecutive: "Jane Smith",
      proposalEmailDate: "2025-08-02",
      futureProposalDate: "2025-08-20",
      updatedBy: "ashok_dhas",
      updatedDate: "2025-08-08",
      updatedTime: "09:02 AM",
      
    },
    {
      key: "2",
      serialNo: 2,
      trackerId: "TRK-002",
      projectSubtitle: "Phase 2",
      projectName: "Mobile App Launch",
      leadGenerationDate: "2025-08-03",
      potentialClientName: "Beta Ltd",
      status: "Completed",
      emailId: "info@betaltd.com",
      phoneNumber: "+1 555-5678",
      referenceBrokerName: "Sarah Broker",
      comments: "All tests completed",
      dateOfFutureContact: "2025-08-18",
      marketingExecutive: "Mark Lee",
      proposalEmailDate: "2025-08-05",
      futureProposalDate: "2025-08-22",
      updatedBy: "ashok_dhas",
      updatedDate: "2025-08-08",
      updatedTime: "08:44 AM",
      
    }
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

export default BDTracker;

import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { deleteProperty, propertyGetAll } from "../../(api)/Properties";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";
import ExportDataToExcel from "../../comp/export_data/ExportData";

const Properties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saleStatus, setSaleStatus] = useState();
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const plotType = searchParams.get("type");
  const plotStatus = searchParams.get("status");

  //navigate----------------------------------------------
  const navigate = useNavigate();
  const edit = (Id) => {
    navigate(`/addproperties?pid=${Id}`);
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const getAllProperty = async () => {
    try {
      setLoading(true);
      const response = await propertyGetAll();
      if (response.status === "OK") {
        setData(response.data);
      }

      const saleStatus = [
        ...new Set(
          response.data && response.data.map((item) => item.plotSaleStatus)
        ),
      ].map((item) => ({ text: item, item }));

      setSaleStatus(saleStatus);
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteId = async (cid) => {
    try {
      setLoading(true);
      const response = await deleteProperty(cid);
      if (response.status === "OK") {
        toast.success("Successfully Deleted!!");
        getAllProperty();
      }
    } catch (err) {
      console.log(err)
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
    { title: "Id", dataIndex: "pid", key: "pid" },
    {
      title: "Property Type",
      dataIndex: "propertyType",
      key: "propertyType",
      filters: [
        {
          text: "Residential",
          value: "Residential",
        },
        {
          text: "Commercial",
          value: "Commercial",
        },
      ],
      searchable: false,
      onFilter: (value, record) => record.propertyType === value,
    },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
    {
      title: "Project Subtitle",
      dataIndex: "projectSubtitle",
      key: "projectSubtitle",
    },
    { title: "Plot No.", dataIndex: "plotNo", key: "plotNo" },

    { title: "Phase", dataIndex: "phase", key: "phase" },
    { title: "Plot Size (Sq. Ft)", dataIndex: "plotSize", key: "plotSize" },
    { title: "Rate per Sq Ft.", dataIndex: "ratePerSqft", key: "ratePerSqft" },

    { title: "Other Costs", dataIndex: "otherCosts", key: "otherCosts" },
    {
      title: "Total Rate of the plot",
      dataIndex: "totalRateOfPlot",
      key: "totalRateOfPlot",
    },
    {
      title: "Plot Development Status",
      dataIndex: "plotDevelopementStatus",
      key: "plotDevelopementStatus",
    },
    {
      title: "Plot Sale Status",
      dataIndex: "plotSaleStatus",
      key: "plotSaleStatus",
      filters: saleStatus,
      onFilter: (value, record) => record.plotSaleStatus === value,
      searchable: false, // This will disable the search filter for this column
    },
    {
      title: "Plot Owner - Client ID",
      dataIndex: "plotOwner",
      key: "plotOwner",
    },
    {
      title: "Plot Financial Status",
      dataIndex: "plotFinancialStatus",
      key: "plotFinancialStatus",
    },
    {
      title: "Pending Amount Value (INR.)",
      dataIndex: "pendingAmmountValue",
      key: "pendingAmmountValue",
    },
    { title: "Registry Date", dataIndex: "registryDate", key: "registryDate" },
    {
      title: "Actual Possession Date",
      dataIndex: "actualPossessionDate",
      key: "actualPossessionDate",
    },
    {
      title: "Tentative Possession Date",
      dataIndex: "tentativePossessionDate",
      key: "tentativePossessionDate",
    },
    { title: "Comments", dataIndex: "comments", key: "comments" },
    { title: "Added by", dataIndex: "addedBy", key: "addedBy" },
    { title: "Added Date", dataIndex: "addedDate", key: "addedDate" },
    { title: "Updated by", dataIndex: "updatedBy", key: "updatedBy" },

    { title: "Updated Date", dataIndex: "updatedDate", key: "updatedDate" },
    { title: "Updated Time", dataIndex: "updatedTime", key: "updatedTime" },
  ];

   useEffect(() => {
    if (plotType && plotStatus) {
      const filtered = data.filter(
        (property) =>
          property.propertyType === plotType &&
          property.plotSaleStatus === plotStatus
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(data);
    }
  }, [data, plotType, plotStatus]);

  const navigateToproepr = ()=>{
    navigate("/properties")
  }

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
      <MainPanel length={data?.length} text="Properties">
        <div>
         <div class="btn_list" style={{ display: "flex" , justifyContent:"flex-start", gap:"10px"}} > <button
            style={{ marginBottom: "10px" }}
            class="btn"
            onClick={() => ExportDataToExcel(data, "Properties")}
          >
            Export Data
          </button>
       { (plotStatus && plotStatus) &&  <button
            style={{ marginBottom: "10px" }}
            class="btn"
            onClick={navigateToproepr}
          >
            View All
          </button>}
          </div>

          <Table
            data={filteredProperties}
            columns={columns}
            showActions={true}
            onEdit={(record) => edit(record.pid)}
            onDelete={(record) => deleteDialog(record.pid)}
          />
        </div>
      </MainPanel>
    </>
  );
};

export default Properties;

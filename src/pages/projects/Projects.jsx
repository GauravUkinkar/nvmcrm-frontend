import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { deleteProject, projectsAdd, projectsGetAll } from "../../(api)/Project";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";

const Projects = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  
 

  useEffect(() => {
    getAllProjects();
  }, []);



  const getAllProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsGetAll();
      if (response.status === "OK") {
        setData(response.data);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const addProject = async () => {
    try {
      if (!projectName) {
        toast.error("Please enter something in the project name");
        return;
      }
      setLoading(true);
      const response = await projectsAdd(projectName);
      if (response.responseMessage === "Project Added Successfully") {
        toast.success("Project Added Successfully");
        getAllProjects();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteId = async (eid) => {
      try {
        setLoading(true);
        const response = await deleteProject(eid);
        if (response.status === "OK") {
          toast.success("Successfully Deleted!!");
          getAllProjects();
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
    { title: "Id", dataIndex: "pid", key: "pid" },
    { title: "Project Name", dataIndex: "projectName", key: "projectName" },
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
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 40,
          }}
        >
          <input
            id="projectName"
            type="text"
            placeholder="Enter project name"
            style={{ flex: 1, padding: "6px 8px", fontSize: 16 }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button
            style={{
              padding: "8px 16px",
              fontSize: 16,
              cursor: "pointer",
              backgroundColor: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
            onClick={() => addProject()}
          >
            + Add Project
          </button>
        </div>

        {data?.length > 0 && (
          <Table
            data={data}
            columns={columns}
            showActions={true}
            onEdit={(record) => edit(record.pid)}
            onDelete={(record) => deleteDialog(record.pid)}
          />
        )}
      </MainPanel>
    </>
  );
};

export default Projects;

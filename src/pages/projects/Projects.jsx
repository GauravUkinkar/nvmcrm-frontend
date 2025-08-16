import React, { useEffect, useState } from "react";
import Table from "../../comp/table/Table";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import {
  deleteProject,
  projectsAdd,
  projectsGetAll,
  updateProject,
} from "../../(api)/Project";

import DeleteConfirmation from "../../comp/deleteConfirmation/DeleteConfirmation";
import axios from "axios";

const Projects = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [editAccess, setEditAccess] = useState();

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
      console.log(err);
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

      let response;
      if (editAccess) {
        response = await updateProject(projectName,editAccess);
        if (response.responseMessage === "Project Updated Successfully") {
          setEditAccess("");
          setProjectName("");
          toast.success("Project Updated Successfully");
          getAllProjects();
        }
      } else {
        response = await projectsAdd(projectName);
        if (response.responseMessage === "Project Added Successfully") {
          toast.success("Project Added Successfully");
          getAllProjects();
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
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
      console.log(err)
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

  // get project by id

  const getProjectById = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}project/getProjectById?pId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditAccess(id);
      setProjectName(response.data.data.projectName);
    } catch (error) {
      console.log(error);
    }
  };

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
            {
              editAccess ? "+ Update Project" : 
              "+ Add Project"
            }
            
          </button>
        </div>

        {data?.length > 0 && (
          <Table
            data={data}
            columns={columns}
            showActions={true}
            onEdit={(record) => getProjectById(record.pid)}
            onDelete={(record) => deleteDialog(record.pid)}
          />
        )}
      </MainPanel>
    </>
  );
};

export default Projects;

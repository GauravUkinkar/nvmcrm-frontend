import React, { useEffect, useState } from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import SelectInput from "../../comp/SelectInput/SelectInput";
import UseForm from "../../UseForm";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { projectsGetAll } from "../../(api)/Project";
const AddActionItems = () => {
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const actionId = searchParams.get("aid");
  const [projectList, setProjectList] = useState();
  const navigate = useNavigate();

  const formObj = {
    projectName: "",
    projectSubtitle: "",
    actionItemDescription: "",
    actionItemStatus: "",
    actionOwner: "",
    actionCompleteionDate: "",
    comments: "",
  };

  const addActionItems = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      let response;

      if (actionId) {
        const payload = { ...values, aid: actionId };
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}actionItems/updateActionItems`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Action Items Updated successfully!");
          setValues(formObj);
          navigate("/actionItems");
        }
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}actionItems/addActionItems`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Action Items added successfully!");
          setValues(formObj);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, setValues } = UseForm(
    formObj,
    () => ({}),
    addActionItems
  );

  // get action items data by id

  const getActionItemsById = async (id) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }actionItems/getActionItemsById?aId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;

      setValues({
        projectName: data.projectName,
        projectSubtitle: data.projectSubtitle,
        actionItemDescription: data.actionItemDescription,
        actionItemStatus: data.actionItemStatus,
        actionOwner: data.actionOwner,
        actionCompleteionDate: data.actionCompleteionDate,
        comments: data.comments,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (actionId) {
      getActionItemsById(actionId);
    }
  }, [actionId]);

  useEffect(() => {
    projectsGetAll()
      .then((res) => {
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <MainPanel>
        {loader && <Loader />}
        <div class="form">
          <div class="topbar">
            <h1>Add Action Items</h1>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div class="form-row">
              <SelectInput
                label="Project Name"
                value={values.projectName}
                name="projectName"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {projectList &&
                  projectList?.map((item, index) => (
                    <option key={index} value={item?.projectName}>
                      {item?.projectName}
                    </option>
                  ))}
              </SelectInput>
              <Input
                label="Project Subtitle"
                value={values.projectSubtitle}
                name="projectSubtitle"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Action Item Description</label>
                <textarea
                  placeholder="Action Item Description"
                  value={values.actionItemDescription}
                  name="actionItemDescription"
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div>
              <SelectInput
                label="Action Item Status"
                value={values.actionItemStatus}
                name="actionItemStatus"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Status</option>
                <option value="To be started - Action Item is yet to be initated">
                  To be started
                </option>
                <option value="In Progress - Action Item is in progress">
                  In Progress
                </option>
                <option value="Planned - Action Item is planned">
                  Planned
                </option>
                <option value="Pending - Action Item is pending due to dependency on completition of another Action Item or some other event beyond the Owner's control at the moment">
                  Pending
                </option>
                <option value="Delayed - Action Item is delayed due to Owner not being in the capacity to act on it">
                  Delayed
                </option>
                <option value="Completed - Action Item is completed alongwith proof of confirmation from the relevant person/entity">
                  Completed
                </option>
                <option value="Cancelled">Cancelled</option>
                <option value="Closed">Closed</option>
              </SelectInput>
            </div>
            <div class="form-row">
              <SelectInput
                value={values.actionOwner}
                name="actionOwner"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Action Owner"
              >
                <option value="">Select Status</option>
                <option value="nvm">nvm</option>
              </SelectInput>
              <Input
                label="Action Completion Date"
                type="date"
                value={values.actionCompleteionDate}
                name="actionCompleteionDate"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Comments</label>
                <textarea
                  value={values.comments}
                  name="comments"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Comments"
                ></textarea>
              </div>
            </div>

            <div class="form-row">
              <button type="submit" class="btn">
                Add Action Items
              </button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddActionItems;

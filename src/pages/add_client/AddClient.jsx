import React, { useEffect, useState } from "react";
import "./AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import UseForm from "../../UseForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../comp/loader/Loader";
import SelectInput from "../../comp/SelectInput/SelectInput";

import { projectsGetAll } from "../../(api)/Project";
import { getAllEmployeeName } from "../../(api)/Employee";

const AddClient = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState();
  const [employeeName, setEmployeeName] = useState();
  const formObj = {
    clientName: "",
    projectName: "",
    projectSubtitle: "",
    dob: "",
    address: "",
    phoneNumber: "",
    marketingExecutive: "",
    alternateMobNo: "",
    clientEmail: "",
    proffession: "",
    panNo: "",
    aadharNo: "",
    comments: "",
    brokerName: "",
  };

  const [searchparams] = useSearchParams();

  const clientId = searchparams.get("cid");

  const addClient = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      let response;
      if (clientId) {
        const payload = { ...values, cid: clientId };
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}client/updateClient`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setValues(formObj); // Reset form after successful submission
          toast.success("Client updated successfully!");
          navigate("/clients");
        }
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}client/addClient`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setValues(formObj); // Reset form after successful submission
          toast.success("Client added successfully!");
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
    addClient
  );

  // get client by id

  const getClientById = async (id) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}client/getClientById?cId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setValues({
        clientName: data.clientName,
        projectName: data.projectName,
        projectSubtitle: data.projectSubtitle,
        dob: data.dob,
        address: data.address,
        phoneNumber: data.phoneNumber,
        marketingExecutive: data.marketingExecutive,
        alternateMobNo: data.alternateMobNo,
        clientEmail: data.clientEmail,
        proffession: data.proffession,
        panNo: data.panNo,
        aadharNo: data.aadharNo,
        comments: data.comments,
        brokerName: data.brokerName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      getClientById(clientId);
    }
  }, [clientId]);

  useEffect(() => {
    projectsGetAll()
      .then((res) => {
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllEmployeeName()
      .then((res) => {
        setEmployeeName(res.data);
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
            <h2>Add Client</h2>
          </div>
          <form
            action="
            "
            onSubmit={handleSubmit}
          >
            <div class="form-row">
              <Input
                label="Client Name"
                name="clientName"
                onChange={handleChange}
                value={values.clientName}
                onBlur={handleBlur}
              />
              <Input
                label="Project Subtitle"
                name="projectSubtitle"
                onChange={handleChange}
                value={values.projectSubtitle}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <SelectInput
                label="Project Name"
                name="projectName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectName}
              >
                <option value="">Select Project Name</option>
                {projectList &&
                  projectList?.map((item, index) => (
                    <option key={index} value={item?.projectName}>
                      {item?.projectName}
                    </option>
                  ))}
              </SelectInput>
              <Input
                label="Date of Birth"
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
                type="date"
              />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Address</label>
                <textarea
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  id=""
                ></textarea>
              </div>
              <Input
                label="Mobile Number"
                name="phoneNumber"
                onChange={handleChange}
                value={values.phoneNumber}
                onBlur={handleBlur}
              />
            </div>

            <div class="form-row">
              <SelectInput
                value={values.marketingExecutive}
                name="marketingExecutive"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Marketing Executive"
              >
                <option value="">Select Owner</option>
                {employeeName &&
                  employeeName?.map((item, index) => (
                    <option key={index} value={item?.empName}>
                      {" "}
                      {item?.empName}{" "}
                    </option>
                  ))}
              </SelectInput>
              <Input
                label="Alternate Mobile Number"
                name="alternateMobNo"
                onChange={handleChange}
                value={values.alternateMobNo}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Client Email"
                name="clientEmail"
                onChange={handleChange}
                value={values.clientEmail}
                onBlur={handleBlur}
              />
              <Input
                label="Profession"
                name="proffession"
                onChange={handleChange}
                value={values.proffession}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="PAN Number"
                name="panNo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.panNo}
              />
              <Input
                label="Aadhar Number"
                name="aadharNo"
                onChange={handleChange}
                value={values.aadharNo}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Comments</label>
                <textarea
                  placeholder="Comments"
                  name="comments"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comments}
                  id=""
                ></textarea>
              </div>
              <Input
                label="Broker Name"
                name="brokerName"
                onChange={handleChange}
                value={values.brokerName}
                onBlur={handleBlur}
              />
            </div>

            <div class="form-row">
              <button class="btn">Add Client</button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddClient;

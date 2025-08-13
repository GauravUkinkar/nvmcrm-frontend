import React from "react";
import "./AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import UseForm from "../../UseForm";
import axios from "axios";
import { toast } from "react-toastify";

const AddClient = () => {
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

  const addClient = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}client/addClient`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.status === 200){
        setValues(formObj); // Reset form after successful submission
        toast.success("Client added successfully!");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, setValues } = UseForm(
    formObj,
    () => ({}),
    addClient
  );

  return (
    <>
      <MainPanel>
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
              <Input
                label="Project Name"
                name="projectName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectName}
              />
              <Input
                label="Date of Birth"
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
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
              <Input
                label="Marketing Executive"
                name="marketingExecutive"
                onChange={handleChange}
                value={values.marketingExecutive}
                onBlur={handleBlur}
              />
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

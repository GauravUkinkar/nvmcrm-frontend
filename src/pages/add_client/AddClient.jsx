import React from "react";
import "./AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import UseForm from "../../UseForm";

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

  const addClient = () => {
    try {
        
    } catch (error) {
        
    }
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    setValues,
    errors,
    setErrors,
  } = UseForm(formObj, () => ({}), addClient);
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
              <Input label="Client Name" />
              <Input label="Project Subtitle" />
            </div>
            <div class="form-row">
              <Input label="Project Name" />
              <Input label="Date of Birth" />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Address</label>
                <textarea placeholder="Address" name="" id=""></textarea>
              </div>
              <Input label="Mobile Number" />
            </div>

            <div class="form-row">
              <Input label="Marketing Executive" />
              <Input label="Alternate Mobile Number" />
            </div>
            <div class="form-row">
              <Input label="Client Email" />
              <Input label="Profession" />
            </div>
            <div class="form-row">
              <Input label="PAN Number" />
              <Input label="Aadhar Number" />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Comments</label>
                <textarea placeholder="Comments" name="" id=""></textarea>
              </div>
              <Input label="Broker Name" />
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

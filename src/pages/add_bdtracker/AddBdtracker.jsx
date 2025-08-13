import React, { useState } from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import SelectInput from "../../comp/SelectInput/SelectInput";
import axios from "axios";
import UseForm from "../../UseForm";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";
const AddBdtracker = () => {
  const [loader, setLoader] = useState(false);

  const formObj = {
    leadGenerationDate: "",
    projectSubtitle: "",
    projectName: "",
    potentialClientName: "",
    status: "",
    emailId: "",
    phoneNo: "",
    reference: "",
    comments: "",
    dateOfFutureContact: "",
    marketingExecutive: "",
    dateofemailingtheBusinessProposaltoPotentialClient: "",
    futuredatetoproceedonBusinessProposal: "",
  };

  const addbd = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}bdtracker/addBDTracker`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setValues(formObj);
        toast.success("BD Tracker added successfully!");
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
    addbd
  );
  return (
    <>
      <MainPanel>
        {loader && <Loader />}
        <div class="form">
          <div class="topbar">
            <h1>Add BD Tracker</h1>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div class="form-row">
              <Input
                label="Lead Generation Date"
                name="leadGenerationDate"
                value={values.leadGenerationDate}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
              />
              <Input
                label="Project Subtitle"
                name="projectSubtitle"
                value={values.projectSubtitle}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <SelectInput
                label="Project Name"
                name="projectName"
                value={values.projectName}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Project</option>
                <option value="nvm">nvm</option>
              </SelectInput>
              <SelectInput
                label="Potential Client Name"
                name="potentialClientName"
                value={values.potentialClientName}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Client</option>
                <option value="nvm">nvm</option>
              </SelectInput>
            </div>
            <div class="form-row">
              <SelectInput
                label="Status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Status</option>
                <option value="nvm">nvm</option>
              </SelectInput>
              <Input
                label="Email-Id"
                name="emailId"
                value={values.emailId}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
              />
            </div>
            <div class="form-row">
              <Input
                label="Phone number"
                name="phoneNo"
                value={values.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectInput
                label="Reference (Broker Name)atus"
                name="reference"
                value={values.reference}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Broker</option>
                <option value="nvm">nvm</option>
              </SelectInput>
            </div>

            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Comments</label>
                <textarea
                  placeholder="Comments"
                  name="comments"
                  value={values.comments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id=""
                ></textarea>
              </div>
              <Input
                name="dateOfFutureContact"
                value={values.dateOfFutureContact}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Date of Future Contact"
                type="date"
              />
            </div>
            <div class="form-row">
              <SelectInput
                name="marketingExecutive"
                value={values.marketingExecutive}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Marketing Executive"
              >
                <option value="">Select Marketing Executive</option>
                <option value="nvm">nvm</option>
              </SelectInput>
              <Input
                label="Date of emailing the Business Proposal to Potential Client"
                type="date"
                name="dateofemailingtheBusinessProposaltoPotentialClient"
                value={
                  values.dateofemailingtheBusinessProposaltoPotentialClient
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Future date to proceed on Business Proposal"
                type="date"
                name="futuredatetoproceedonBusinessProposal"
                value={values.futuredatetoproceedonBusinessProposal}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <button class="btn">Add BD Tracker</button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddBdtracker;

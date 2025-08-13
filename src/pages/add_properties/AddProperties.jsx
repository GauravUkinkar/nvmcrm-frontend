import React, { useState } from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import SelectInput from "../../comp/SelectInput/SelectInput";
import { Select } from "antd";
import UseForm from "../../UseForm";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";
const AddProperties = () => {
  const [loader, setLoader] = useState(false);
  const formObj = {
    plotNo: "",
    projectSubtitle: "",
    projectName: "",
    phase: "",
    plotSize: "",
    ratePerSqft: "",
    otherCosts: "",
    totalRateOfPlot: "",
    plotDevelopementStatus: "",
    plotSaleStatus: "",
    plotOwner: "",
    plotFinancialStatus: "",
    pendingAmmountValue: "",
    registryDate: "",
    actualPossessionDate: "",
    tentativePossessionDate: "",
    comments: "",
  };

  const addProperties = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}property/addproperty`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setValues(formObj); // Reset form after successful submission
        toast.success("Property added successfully!");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, setValues } = UseForm(
    formObj,
    () => ({}),
    addProperties
  );

  return (
    <>
    
      <MainPanel>
          {loader && <Loader />}
        <div class="form">
          <div class="topbar">
            <h2>Add Properties</h2>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div class="form-row">
              <Input
                name="plotNo"
                value={values.plotNo}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Plot No."
              />
              <Input
                name="projectSubtitle"
                value={values.projectSubtitle}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Project Subtitle"
              />
            </div>
            <div class="form-row">
              <Input
                name="projectName"
                value={values.projectName}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Project Name"
              />
              <Input
                name="phase"
                value={values.phase}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phase"
              />
            </div>
            <div class="form-row">
              <Input
                name="plotSize"
                value={values.plotSize}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Plot Size (Sq. Ft)"
              />
              <Input
                name="ratePerSqft"
                value={values.ratePerSqft}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Rate per Sq Ft."
              />
            </div>
            <div class="form-row">
              <Input
                name="otherCosts"
                value={values.otherCosts}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Other Costs"
              />
              <Input
                name="totalRateOfPlot"
                value={values.totalRateOfPlot}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Total Rate of the plot"
              />
            </div>
            <div class="form-row">
              <SelectInput
                name="plotDevelopementStatus"
                value={values.plotDevelopementStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Plot Development status"
              >
                <option value="">Select Plot Development status</option>
                <option value="Development under progress">
                  Development under progress
                </option>
                <option value="Developed - Not ready for possession">
                  Developed - Not ready for possession
                </option>
                <option value="Developed - Ready for possession">
                  Developed - Ready for possession
                </option>
                <option value="To be developed">To be developed</option>
              </SelectInput>
              <SelectInput
                name="plotSaleStatus"
                value={values.plotSaleStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Plot Sale status"
              >
                <option value="">Select Plot Sale status</option>
                <option value="Available">Available</option>
                <option value="Booked - Token Amount not paid">
                  Booked - Token Amount not paid
                </option>
                <option value="Booked - Partial payment made">
                  Booked - Partial payment made
                </option>
                <option value="Booked - Total payment made">
                  Booked - Total payment made
                </option>
                <option value="Booked - Token amount paid">
                  Booked - Token amount paid
                </option>
                <option value="Expression of Interest">
                  Expression of Interest
                </option>
                <option value="Registry Scheduled">Registry Scheduled</option>
                <option value="Sold - Not available for resale">
                  Sold - Not available for resale
                </option>
                <option value="Sold - Available for resale">
                  Sold - Available for resale
                </option>
              </SelectInput>
            </div>
            <div class="form-row">
              <SelectInput
                name="plotOwner"
                value={values.plotOwner}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Plot Owner"
              >
                <option value="">Select Owner</option>
                <option value="Rishabh Khade">Rishabh Khade</option>
              </SelectInput>
              <SelectInput
                name="plotFinancialStatus"
                value={values.plotFinancialStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Plot Financial Status"
              >
                <option value="">Select Owner</option>
                <option value="Amount Pending">Amount Pending</option>
                <option value="">Complete Amount Paid</option>
              </SelectInput>
            </div>
            <div class="form-row">
              <Input
                name="pendingAmmountValue"
                value={values.pendingAmmountValue}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Pending Amount Value (INR.)"
              />
              <Input
                name="tentativePossessionDate"
                value={values.tentativePossessionDate}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Tentative Possession Date"
                type="date"
              />
            </div>
            <div class="form-row">
              <Input
                name="registryDate"
                value={values.registryDate}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Registry Date"
                type="date"
              />
              <Input
                name="actualPossessionDate"
                value={values.actualPossessionDate}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Actual Possession Date"
                type="date"
              />
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
            </div>

            <div class="form-row">
              <button type="submit" class="btn">
                Add Properties
              </button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddProperties;

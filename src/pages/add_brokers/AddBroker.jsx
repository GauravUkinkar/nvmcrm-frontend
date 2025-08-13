import React, { useState } from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import axios from "axios";
import UseForm from "../../UseForm";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
const AddBroker = () => {
  const [loader, setLoader] = useState(false);
  const formObj = {
    brokerName: "",
    dob: "",
    address: "",
    contactNo: "",
    alternateConNo: "",
    mailId: "",
    panNo: "",
    aadharNo: "",
    bankName: "",
    accountNo: "",
    ifscCode: "",
    comments: "",
  };

  const addBroker = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}broker/addBroker`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setValues(formObj); // Reset form after successful submission
        toast.success("Broker added successfully!");
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
    addBroker
  );
  return (
    <>
      <MainPanel>
        {loader && <Loader />}
        <div class="form">
          <div class="topbar">
            <h2>Add Broker</h2>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div class="form-row">
              <Input
                label="Broker Name"
                name="brokerName"
                value={values.brokerName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Date of Birth"
                name="dob"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
              />
            </div>
            <div class="form-row">
              <div class="input-textarea input">
                <label for="">Address</label>
                <textarea
                  placeholder="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id=""
                ></textarea>
              </div>
              <Input
                label="Contact Number"
                name="contactNo"
                value={values.contactNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Alternate Contact Number"
                name="alternateConNo"
                value={values.alternateConNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Broker E-mail"
                name="mailId"
                value={values.mailId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="PAN Number"
                name="panNo"
                value={values.panNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="AADHAR Number"
                name="aadharNo"
                value={values.aadharNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Bank Name"
                name="bankName"
                value={values.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Account Number"
                name="accountNo"
                value={values.accountNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="IFSC Code"
                name="ifscCode"
                value={values.ifscCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
                Add Broker
              </button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddBroker;

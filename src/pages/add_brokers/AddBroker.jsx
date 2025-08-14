import React, { useEffect, useState } from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import axios from "axios";
import UseForm from "../../UseForm";
import Loader from "../../comp/loader/Loader";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
const AddBroker = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()
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

  const [searchparams] = useSearchParams();
  const brokerId = searchparams.get("bid");

  const addBroker = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      let response;

      if (brokerId) {
        const payload = { ...values, bid: brokerId };
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}broker/updateBroker`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setValues(formObj); // Reset form after successful submission
          toast.success("Broker updated successfully!");
          navigate("/brokers")
        }
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}broker/addBroker`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response.status === 200) {
           setValues(formObj); // Reset form after successful submission
        toast.success("Broker added successfully!");
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
    addBroker
  );

  // get broker byID

  const getBrokerById = async (id) => {
    try {
      setLoader(true);

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}broker/getBroker/bId?bId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      setValues({
        brokerName: data.brokerName,
        dob: data.dob,
        address: data.address,
        contactNo: data.contactNo,
        alternateConNo: data.alternateConNo,
        mailId: data.mailId,
        panNo: data.panNo,
        aadharNo: data.aadharNo,
        bankName: data.bankName,
        accountNo: data.accountNo,
        ifscCode: data.ifscCode,
        comments: data.comments,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (brokerId) {
      getBrokerById(brokerId);
    }
  }, [brokerId]);

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

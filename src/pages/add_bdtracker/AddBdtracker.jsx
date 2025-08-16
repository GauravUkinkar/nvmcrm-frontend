import React, { useEffect, useState } from "react";
import "../add_client/AddClient.scss";
import MainPanel from "../../comp/Main_panel/MainPanel";
import Input from "../../comp/input/Input";
import SelectInput from "../../comp/SelectInput/SelectInput";
import axios from "axios";
import UseForm from "../../UseForm";
import { toast } from "react-toastify";
import Loader from "../../comp/loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { projectsGetAll } from "../../(api)/Project";
import { clientGetAll } from "../../(api)/Client";
import { brokerGetAll } from "../../(api)/BrokerApi";
const AddBdtracker = () => {
  const [loader, setLoader] = useState(false);
  const [searchparams] = useSearchParams();
  const [projectList, setProjectList] = useState();
  const [clientList, setClientList] = useState();
  const [brokerList, setBrokerList] = useState();
  const bdId = searchparams.get("bdId");
  const navigate = useNavigate();
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
      let response;

      if (bdId) {
        const payload = { ...values, bdId: bdId };
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}bdtracker/updateBDTracker`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("BD Tracker updated successfully!");
          navigate("/bdTracker");
        }
      } else {
        response = await axios.post(
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

  // get bd tracker by id

  const getBdTrackerById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setLoader(true);

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }bdtracker/getBDTrackerById?bId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      setValues({
        leadGenerationDate: data?.leadGenerationDate,
        projectSubtitle: data?.projectSubtitle,
        projectName: data?.projectName,
        potentialClientName: data?.potentialClientName,
        status: data?.status,
        emailId: data?.emailId,
        phoneNo: data?.phoneNo,
        reference: data?.reference,
        comments: data?.comments,
        dateOfFutureContact: data?.dateOfFutureContact,
        marketingExecutive: data?.marketingExecutive,
        dateofemailingtheBusinessProposaltoPotentialClient:
          data?.dateofemailingtheBusinessProposaltoPotentialClient,
        futuredatetoproceedonBusinessProposal:
          data?.futuredatetoproceedonBusinessProposal,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (bdId) {
      getBdTrackerById(bdId);
    }
  }, [bdId]);

  useEffect(() => {
    projectsGetAll()
      .then((res) => {
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    clientGetAll()
      .then((res) => {
        setClientList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    brokerGetAll()
      .then((res) => {
        setBrokerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(brokerList, "brokerList");

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
              <SelectInput
                label="Potential Client Name"
                name="potentialClientName"
                value={values.potentialClientName}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Client</option>
                {clientList &&
                  clientList?.map((item, index) => (
                    <option key={index} value={item?.clientName}>
                      {item?.clientName}
                    </option>
                  ))}
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
                {brokerList &&
                  brokerList?.map((item, index) => (
                    <option key={index} value={item?.brokerName}>
                      {" "}
                      {item?.brokerName}{" "}
                    </option>
                  ))}
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

import React, { useEffect, useState } from "react";
import MainPanel from "../../comp/Main_panel/MainPanel";
import "../add_client/AddClient.scss";
import Input from "../../comp/input/Input";
import UseForm from "../../UseForm";

import axios from "axios";
import SelectInput from "../../comp/SelectInput/SelectInput";
import AddEmployeeValidate from "../../validates/AddEmployee";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../comp/loader/Loader";

const AddEmployee = () => {
  const [searchparams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const empId = searchparams.get("eid");
  const navigate = useNavigate();
  const formobj = {
    empId: "",
    empName: "",
    userName: "",
    password: "",
    role: "",
    projectSubtitles: "",
    projectName: "",
    gender: "",
    employeeStatus: "",
    designation: "",
    dateOfJoining: "",
    dateOfLeaving: "",
    contactNo: "",
    alternateConNo: "",
    mailId: "",
    dob: "",
    bankName: "",
    accountNo: "",
    ifscCode: "",
    aadharCard: "",
    panNo: "",
    commennts: "",
    monthlySalary: "",
    ctc: "",
  };

  const addEmployee = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");

      let response;

      if (empId) {
        const payload = { ...values, eid: empId };
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}admin/UpdateEmployee`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Employee Updated successfully!");
          navigate("/employees");
        }
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}admin/RegisterUser`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Employee added successfully!");
      }

      if (response.status === 200) {
        setValues({
          empId: "",
          empName: "",
          userName: "",
          password: "",
          role: "",
          projectSubtitles: "",
          projectName: "",
          gender: "",
          employeeStatus: "",
          designation: "",
          dateOfJoining: "",
          dateOfLeaving: "",
          contactNo: "",
          alternateConNo: "",
          mailId: "",
          dob: "",
          bankName: "",
          accountNo: "",
          ifscCode: "",
          aadharCard: "",
          panNo: "",
          commennts: "",
          monthlySalary: "",
          ctc: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, setValues, errors } =
    UseForm(formobj, empId ? () => ({}) : AddEmployeeValidate, addEmployee);

  const getEmployeeById = async (id) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}admin/getEmployee/{eId}?eId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;

      setValues({
        empId: data?.empId,
        empName: data?.empName,
        userName: data?.userName,
        password: "",
        role: data?.role,
        projectSubtitles: data?.projectSubtitles,
        projectName: data?.projectName,
        gender: data?.gender,
        employeeStatus: data?.employeeStatus,
        designation: data?.designation,
        dateOfJoining: data?.dateOfJoining,
        dateOfLeaving: data?.dateOfLeaving,
        contactNo: data?.contactNo,
        alternateConNo: data?.alternateConNo,
        mailId: data?.mailId,
        dob: data?.dob,
        bankName: data?.bankName,
        accountNo: data?.accountNo,
        ifscCode: data?.ifscCode,
        aadharCard: data?.aadharCard,
        panNo: data?.panNo,
        commennts: data?.commennts,
        monthlySalary: data?.monthlySalary,
        ctc: data?.ctc,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (empId) {
      getEmployeeById(empId);
    }
  }, [empId]);

  return (
    <>
      <MainPanel>
        {loader && <Loader />}
        <div class="form">
          <div class="topbar">Add Employee</div>
          <form action="" onSubmit={handleSubmit}>
            <div class="form-row">
              <Input
                label="Employee Id"
                value={values.empId}
                name="empId"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="User Name"
                error={errors.userName}
                value={values.userName}
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Employee Name"
                error={errors.empName}
                value={values.empName}
                name="empName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <SelectInput
                label="Role"
                error={errors.role}
                value={values.role}
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </SelectInput>
            </div>
            <div class="form-row">
              <Input
                label="Password"
                error={errors.password}
                value={values.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Project Subtitle"
                value={values.projectSubtitles}
                name="projectSubtitles"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Project Name"
                value={values.projectName}
                name="projectName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Gender"
                value={values.gender}
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Employee Status"
                value={values.employeeStatus}
                name="employeeStatus"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Designation"
                value={values.designation}
                name="designation"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Date of Joining"
                type="date"
                value={values.dateOfJoining}
                name="dateOfJoining"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Date of Leaving"
                type="date"
                value={values.dateOfLeaving}
                name="dateOfLeaving"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Contact Number"
                value={values.contactNo}
                name="contactNo"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Alternate Contact Number"
                value={values.alternateConNo}
                name="alternateConNo"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Mail ID"
                value={values.mailId}
                name="mailId"
                onChange={handleChange}
                type="email"
                onBlur={handleBlur}
              />
              <Input
                label="Date of Birth"
                type="date"
                value={values.dob}
                name="dob"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="Bank Name"
                value={values.bankName}
                name="bankName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Account Number"
                value={values.accountNo}
                name="accountNo"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="IFSC Code"
                value={values.ifscCode}
                name="ifscCode"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="AADHAR Number"
                value={values.aadharCard}
                name="aadharCard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <Input
                label="PAN Number"
                value={values.panNo}
                name="panNo"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div class="input-textarea input">
                <label for="">Comments</label>
                <textarea
                  value={values.commennts}
                  name="commennts"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Comments"
                ></textarea>
              </div>
            </div>
            <div class="form-row">
              <Input
                label="Monthly Salary"
                value={values.monthlySalary}
                name="monthlySalary"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="CTC"
                value={values.ctc}
                name="ctc"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div class="form-row">
              <button class="btn"> Add Employee </button>
            </div>
          </form>
        </div>
      </MainPanel>
    </>
  );
};

export default AddEmployee;

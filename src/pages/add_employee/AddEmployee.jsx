import React from "react";
import MainPanel from "../../comp/Main_panel/MainPanel";
import "../add_client/AddClient.scss";
import Input from "../../comp/input/Input";
import UseForm from "../../UseForm";

import axios from "axios";
import SelectInput from "../../comp/SelectInput/SelectInput";
import AddEmployeeValidate from "../../validates/AddEmployee";
import { toast } from "react-toastify";

const AddEmployee = () => {
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
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}admin/RegisterUser`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

        toast.success("Employee added successfully!");
      }

    
    } catch (error) {
      console.log(error);
    }
  };

  const { handleChange, handleSubmit, handleBlur, values, setValues, errors } =
    UseForm(formobj, AddEmployeeValidate, addEmployee);
  console.log(errors);

  return (
    <>
      <MainPanel>
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
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
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

import React from "react";
import MainPanel from "../../comp/Main_panel/MainPanel";
import "../add_client/AddClient.scss";
import Input from "../../comp/input/Input";
import UseForm from "../../UseForm";
import { AddEmployeeValidate } from "../../validates/AddEmployee";

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

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,

    errors,
  } = UseForm(formobj, AddEmployeeValidate);

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
                label="Employee Name"
                error={errors.empName}
                value={values.empName}
                name="empName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input label="Role" />
            </div>
            <div class="form-row">
              <Input label="Password" />
              <Input label="Project Subtitle" />
            </div>
            <div class="form-row">
              <Input label="Project Name" />
              <Input label="Gender" />
            </div>
            <div class="form-row">
              <Input label="Employee Status" />
              <Input label="Designation" />
            </div>
            <div class="form-row">
              <Input label="Date of Joining" type="date" />
              <Input label="Date of Leaving" type="date" />
            </div>
            <div class="form-row">
              <Input label="Contact Number" />
              <Input label="Alternate Contact Number" />
            </div>
            <div class="form-row">
              <Input label="Mail ID" />
              <Input label="Date of Birth" type="date" />
            </div>
            <div class="form-row">
              <Input label="Bank Name" />
              <Input label="Account Number" />
            </div>
            <div class="form-row">
              <Input label="IFSC Code" />
              <Input label="AADHAR Number" />
            </div>
            <div class="form-row">
              <Input label="PAN Number" />
              <div class="input-textarea input">
                <label for="">Comments</label>
                <textarea placeholder="Comments" name="" id=""></textarea>
              </div>
            </div>
            <div class="form-row">
              <Input label="Monthly Salary" />
              <Input label="CTC" />
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

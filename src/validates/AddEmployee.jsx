export  default function AddEmployeeValidate(value) {
  let error = {};

  if (!value.empName) {
    error.empName = "Employee Name is required";
  }

  if (!value.userName) {
    error.userName = "Username is required";
  }
  if (!value.password) {
    error.password = "Password Id is required";
  }
  if (!value.role) {
    error.role = "Role is required";
  }

  return error;
};

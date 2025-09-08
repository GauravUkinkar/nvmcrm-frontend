export const bdTrackerValidate = (values) => {
  let error = {};

  if (!values.plotNumber) {
    error.plotNumber = "Plot Number is required";
  }
  if (!values.potentialClientName) {
    error.potentialClientName = "Client Name is required";
  }
  if (!values.marketingExecutive) {
    error.marketingExecutive = "Marketing Executive is required";
  }

  if (!values.status) {
    error.status = "Status is required";
  }

  if(!values.dateOfFutureContact){
    error.dateOfFutureContact = "Date Of Future Contact is required";
  }



  return error;
};

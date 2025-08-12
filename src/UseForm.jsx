import React, { useEffect, useState } from "react";

const UseForm = (formobj, validate, callback) => {
  const [values, setValues] = useState(formobj);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

  const handleBlur = (e) => {
    const { value } = e.target;

    e.target.value = value.trim(); // remove start & end spaces
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    setValues,
    errors,
    setErrors,
  };
};

export default UseForm;

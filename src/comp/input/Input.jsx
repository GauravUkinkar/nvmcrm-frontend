import React from "react";
import "./Input.scss";
const Input = ({ label, className,value, onChange, onBlur, name, type, error }) => {
  return (
    <>
      <div class="input">
        <label for=""> {label}</label>
        <input
          placeholder={label}
          type={type ? type : "text"}
          name={name}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          className={className ? className : ""}
          
        />
        {error && <small className="text-warning ">{error}</small>}
      </div>
    </>
  );
};

export default Input;

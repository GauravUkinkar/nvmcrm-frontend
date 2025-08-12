import React from "react";
import "./SelectInput.scss";
const SelectInput = ({ children, name, value,label, onChange, onBlur, error }) => {
  return (
    <div className="selectinput">
      <label for="">  {label} </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id=""
      >
        {children}
      </select>
      {error && <small className="text-warning">{error}</small>}
    </div>
  );
};

export default SelectInput;

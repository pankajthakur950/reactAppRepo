import React from "react";

import "components/Form/FormInput.scss";

export default function FormInput({ label, handleChange, ...otherInputAttr }) {
  return (
    <div className="form-input">
      <input
        className="form-input__field"
        onChange={handleChange}
        {...otherInputAttr}
      />
      {label ? (
        <label className={`${otherInputAttr.value.length > 0 ? "shrink" : ""} form-input__label`} htmlFor={otherInputAttr.name}>
          {label}
        </label>
      ) : null}
    </div>
  );
}

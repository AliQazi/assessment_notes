import React from "react";

const Input = (props) => {
  const {
    placeholder,
    name,
    id,
    type,
    values,
    onChange,
    onBlur,
    touched,
    errors,
  } = props;
  return (
    <>
      <input
        name={name}
        className={`form-control p-2 ${touched && errors ? "is-invalid" : ""}`}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={values}
        onBlur={onBlur}
        autoComplete="off"
      />
    </>
  );
};

export default Input;

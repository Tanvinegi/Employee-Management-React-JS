import React, { useState } from "react";
import Validate from "./Validate";

const useForm = (Validate) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    Title: "",
    message: "",
    checkbox: "false",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(Validate(values));
  };

  return { handleChange, values, handleSubmit, formErrors };
};

export default useForm;

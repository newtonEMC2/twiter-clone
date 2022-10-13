import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export const Form = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState({});
  if (!children) return null;
  return (
    <form
      aria-label="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({});
      }}
    >
      <div>{children(formData, setFormData)}</div>
    </form>
  );
};

export const InputField = ({ children = "", onChange, ariaLabel, name }) => {
  if (!name) throw Error("name is mandatory");
  return (
    <TextField
      inputProps={{ "aria-label": ariaLabel }}
      onChange={onChange}
      value={children}
      name={name}
      variant="outlined"
    ></TextField>
  );
};

export const SubmitButton = ({ children, ariaLabel, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      variant="contained"
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

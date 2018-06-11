import React from "react";
import MaterialTextField from "@material-ui/core/TextField";

export const TextField = ({ field, handleChange, handleBlur }) => (
  <MaterialTextField
    select={field.type === "relation"}
    multiline={field.type === "textarea"}
    name={field.name}
    label={field.label || field.name}
    fullWidth
    onChange={handleChange}
    onBlur={handleBlur}
    value={field.value}
  >
    {field.options &&
      field.options.map(option => {
        return <option key={option.value} value={option.value}>{option.text}</option>;
      })}
  </MaterialTextField>
);

import React from "react";
import MaterialTextField from "@material-ui/core/TextField";
import moment from 'moment';

export const TextField = ({ field, handleChange, handleBlur }) => (
  <MaterialTextField
    select={field.type === "relation"}
    multiline={field.type === "textarea"}
    name={field.name}
    label={field.label || field.name}
    fullWidth
    type={field.type}
    InputProps={field.inputProps}
    onChange={handleChange}
    onBlur={handleBlur}
    defaultValue={field.type == 'date' ? moment().format("YYYY-MM-DD") : null}
    value={field.value}
  >
    {field.options &&
      field.options.map(option => {
        return <option key={option.value} value={option.value}>{option.text}</option>;
      })}
  </MaterialTextField>
);

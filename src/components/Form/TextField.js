import React from "react";
import MaterialTextField from "@material-ui/core/TextField";
import moment from 'moment';

export const TextField = ({ field, handleChange, handleBlur }) => (
  <MaterialTextField
    select={field.type === "relation"}
    multiline
    rows={field.type === "textarea" ? 4 : null}
    name={field.name}
    label={field.label || field.name}
    fullWidth
    className={field.className}
    InputProps={field.inputProps}
    onChange={handleChange}
    helperText={field.helperText}
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

import React, { Component } from "react";
import MaterialTextField from "@material-ui/core/TextField";

var _ = require("lodash");

export const TextField = ({ field, handleChange, handleBlur }) => (
  <MaterialTextField
    select={field.type == "relation"}
    multiline={field.type == "textarea"}
    name={field.name}
    label={field.label || field.name}
    fullWidth
    onChange={handleChange}
    onBlur={handleBlur}
    value={field.value}
  >
    {field.options &&
      field.options.map(opt => {
        return <option value={opt.value}>{opt.text}</option>;
      })}
  </MaterialTextField>
);

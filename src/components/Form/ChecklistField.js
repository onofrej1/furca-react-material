import React from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

var _ = require("lodash");

export const ChecklistField = ({ field, values, handleChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      <span style={{ fontSize: "0.8rem" }}>{field.label || field.name}</span>
    </FormLabel>
    <FormGroup row>
      {field.options.map(option => {
        const checked = _.indexOf(field.value, option.value.toString()) !== -1;

        return (
          <FormControlLabel
            key={option.value}
            className="w-1/3 checkbox-label"
            control={
              <Checkbox
                name={field.name}
                checked={checked}
                onChange={handleChange}
                value={option.value+''}
              />
            }
            label={option.text}
          />
        );
      })}
    </FormGroup>
  </FormControl>
);

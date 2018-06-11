import React from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import RichEditor from './RichEditor';

export const RichEditorField = ({ field, setFieldValue }) => (
  <FormControl component="fieldset" style={{ width: "100%" }}>
    <FormLabel component="legend" className="mb-3">
      <span style={{ fontSize: "0.7rem" }}>{field.name}</span>
    </FormLabel>
    <FormGroup>
      <RichEditor
        data={field.value}
        name={field.name}
        onChange={setFieldValue}
      />
    </FormGroup>
  </FormControl>
);

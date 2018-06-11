import React, { Component } from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";

import { Formik } from "formik";

import { TextField } from "./TextField";
import { ChecklistField } from "./ChecklistField";
import { RichEditorField } from "./RichEditorField";

class Form extends Component {
  render() {
    const { fields, data, onSubmit, validate } = this.props;

    const Buttons = () => (
      <p className="float-right">
        <Button type="submit" variant="contained" color="primary">
          <DoneIcon className="mr-1" /> Save
        </Button>{" "}
        <Button type="button" className="btn-white" variant="contained">
          Back
        </Button>
      </p>
    );

    return (
      <div>
        {data && (
          <Formik
            initialValues={data}
            validate={values => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              console.log(values);
              onSubmit(values);
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldTouched
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {fields.map(field => {
                    let Input = null;
                    field.value = values[field.name];

                    Input = (
                      <TextField
                        field={field}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    );

                    if (field.type == "checklist") {
                      Input = (
                        <ChecklistField
                          field={field}
                          handleCheckboxChange={this.handleCheckboxChange}
                          values={values}
                        />
                      );
                    }

                    if (field.type == "editor") {
                      Input = (
                        <RichEditorField
                          field={field}
                          setFieldValue={setFieldValue}
                        />
                      );
                    }

                    return (
                      <div className="mb-8">
                        {Input}
                        {touched[field.name] &&
                          errors[field.name] && <div>{errors[field.name]}</div>}
                      </div>
                    );
                  })}

                  <Buttons />
                  <div className="clearfix" />
                </form>
              );
            }}
          />
        )}
      </div>
    );
  }
}

export default Form;

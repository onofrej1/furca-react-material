import React, { Component } from "react";

import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { TextField } from "./TextField";
import { ChecklistField } from "./ChecklistField";
import { RichEditorField } from "./RichEditorField";

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {values: {}};
  }

  render() {
    const { fields, data = {}, onSubmit, validate } = this.props;

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

    const handleCheckboxChange = (event, values) => {
      const value = event.target.value;
      const oldValues = values[event.target.name] || [];
      values[event.target.name] = event.target.checked
        ? [...oldValues, value]
        : oldValues.filter(item => item !== value);
        this.setState({values: values});
    };

    return (
      <div>
        {data && (
          <Formik
            initialValues={data}
            validate={validate}
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
              //console.log('values', values);

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

                    if (field.type === "checklist") {
                      Input = (
                        <ChecklistField
                          field={field}
                          handleChange={(e) => handleCheckboxChange(e, values)}
                          values={values}
                        />
                      );
                    }

                    if (field.type === "editor") {
                      Input = (
                        <RichEditorField
                          field={field}
                          setFieldValue={setFieldValue}
                        />
                      );
                    }

                    return (
                      <div className="mb-8" key={field.name}>
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

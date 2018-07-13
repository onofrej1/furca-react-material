import React, { Component } from "react";

import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { TextField } from "./TextField";
import { ChecklistField } from "./ChecklistField";
import { RichEditorField } from "./RichEditorField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import SlateEditor from "./../SlateEditor";

var Recaptcha = require("react-recaptcha");

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { values: {} };
  }

  render() {
    const { fields, data = {}, onSubmit, validate } = this.props;

    const DefaultButtons = () => (
      <p className="float-right">
        <Button type="submit" variant="contained" color="primary">
          <DoneIcon className="mr-1" /> Save
        </Button>{" "}
        <Button type="button" className="btn-white" variant="contained">
          Back
        </Button>
      </p>
    );

    const Buttons = this.props.buttons || DefaultButtons;

    const onEditorChange = (content, fieldName, setFieldValue) => {
      setFieldValue(fieldName, content);
    };

    const handleSwitchChange = (event, values) => {
      values[event.target.name] = event.target.checked;
      this.setState({ values: values });
    };

    const handleCheckboxChange = (event, values) => {
      const value = event.target.value;
      const oldValues = values[event.target.name] || [];
      values[event.target.name] = event.target.checked
        ? [...oldValues, value]
        : oldValues.filter(item => item !== value);
      this.setState({ values: values });
    };

    var verifyCallback = async function (response) {
      console.log(response);

      axios.get('http://localhost:8000/verify-captcha?response='+response).then(
        result => {
          if(result.data.success) {
            console.log('success');
          } else {
            console.log('not sucess');
          }

        },
        error => console.log(error)
      );
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
                    console.log(field);
                    field.value = values[field.name];

                    Input = (
                      <TextField
                        field={field}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        className={field.className}
                      />
                    );

                    if (field.type === "checklist") {
                      Input = (
                        <ChecklistField
                          field={field}
                          handleChange={e => handleCheckboxChange(e, values)}
                          values={values}
                        />
                      );
                    }

                    if (field.type === "switch") {
                      Input = (
                        <FormGroup row>
                          <FormControlLabel
                            control={
                              <Switch
                                name={field.name}
                                checked={field.value}
                                onChange={e => handleSwitchChange(e, values)}
                              />
                            }
                            label={field.label}
                          />
                        </FormGroup>
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

                    if (field.type === "rich-editor") {
                      Input = (
                        <SlateEditor value={field.value} setFieldValue={setFieldValue}  />
                      )
                      /*Input = (
                        <ReactQuill
                          value={field.value}
                          onChange={content =>
                            onEditorChange(content, field.name, setFieldValue)
                          }
                        />
                      );*/
                    }

                    return (
                      <div className={field.wrapper+" mb-8"} key={field.name}>
                        {Input}
                        {touched[field.name] &&
                          errors[field.name] && <div>{errors[field.name]}</div>}
                      </div>
                    );
                  })}

                  {/*<Recaptcha verifyCallback={verifyCallback} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
                  */}
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

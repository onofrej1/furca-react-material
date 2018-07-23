import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Icon from "./Icon";
import { fetchResourceData } from "./../actions/index";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };

    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("path", "obrazky");
    formData.append("uploadedFile", this.state.file);

    const url = this.props.baseUrl + "/upload";

    axios
      .post(url, formData)
      .then(result => {
        console.log(result);
        //this.props.fetchFiles(result.data.path);
        this.uploadFile.value = null;
        this.props.onUploadComplete();
      })
      .catch(function(error) {
        console.log("server error", error);
      });
  }

  render() {
    return (
      <form
        onSubmit={this.submitForm}
        method="post"
        encType="multipart/form-data"
      >
        <div style={{ backgroundColor: "#F0F0F0", padding: "8px" }}>
          <input
            type="file"
            name="myFile"
            ref={input => (this.uploadFile = input)}
            onChange={this.onChange}
          />

          <Button variant="contained" color="primary" type="submit">
            <Icon>cloud_upload</Icon> Upload file
          </Button>
          <br />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    baseUrl: state.baseUrl
  };
};

export default connect(
  mapStateToProps,
  {}
)(FileUpload);

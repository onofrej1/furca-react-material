import React, { Component } from "react";
import { connect } from "react-redux";
import Models from "./../../Models";

import {
  fetchResourceData,
  fetchResourceFields,
  setActiveRow,
  saveResourceData,
  setActiveResourceName
} from "./../../actions";
import Admin from "./Admin";

import Paper from "@material-ui/core/Paper";

import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import Table from "./../Table";
import TextField from "@material-ui/core/TextField";
import Form from "./../Form/Form";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formModel: [],
      listModel: []
    };

    this.setResource = this.setResource.bind(this);
    this.createViewModels = this.createViewModels.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setResource(params.resource);
  }

  componentWillReceiveProps(newProps) {
    const resource = newProps.match.params.resource;
    this.createViewModels(resource);

    if (this.props.activeResourceName != resource) {
      this.setResource(resource);
    }
  }

  setResource(resource) {
    this.props.setActiveResourceName(resource);
    this.props.fetchResourceData(resource);
  }

  edit(row) {
    this.props.setActiveRow(row);
  }

  createViewModels(resource) {
    let form = Models[resource].form;
    let list = Models[resource].list;

    for (var i in form) {
      var field = form[i];
      var options = [];
      if (field.resource) {
        const relationResource = this.props.resourceData[field.resource];

        if (!relationResource) {
          this.props.fetchResourceData(field.resource);
          continue;
        }
        const options = relationResource.map(data => {
          return { value: data.id, text: data[field.show] };
        });
        form = form.map(
          f => (f.name == field.name ? { ...field, options } : f)
        );
      }
    }
    this.setState({
      formModel: form,
      listModel: [{ field: "id" }, ...list]
    });
  }

  handleCheckboxChange = (event, values) => {
    const value = event.target.value;
    const oldValues = values[event.target.name] || [];
    values[event.target.name] = event.target.checked
      ? [...oldValues, value]
      : oldValues.filter(item => item !== value);
    this.props.setActiveRow(values);
  };

  onSubmit(values) {
    this.props.saveResourceData(values);
    this.props.setActiveRow(null);
  }

  render() {
    const data = this.props.data || [];
    const activeResourceName = this.props.activeResourceName;

    const { page, rowsPerPage } = this.state;

    return (
      <Admin>
        <Grid container>
          <Grid item xs />
          <Grid item xs={this.props.activeRow ? 6 : 12}>
            {this.props.activeRow && (
              <Paper>
                {/* <div class="bg-white border-b-2 py-2 px-1" elevation="8">
                <h3><EditIcon /> {this.props.activeResourceName}</h3>
              </div>*/}
                <div className="p-4">
                  <h3 className="mb-3">
                    Add/Edit {this.props.activeResourceName}
                  </h3>
                  <Form
                    fields={this.state.formModel}
                    data={this.props.activeRow}
                    onSubmit={this.onSubmit}
                  />
                </div>
              </Paper>
            )}

            {!this.props.activeRow && (
              <Paper className="p-4">
                <p className="float-left">
                  <Button
                    variant="contained"
                    className="btn-white"
                    size="small"
                    onClick={() => this.props.setActiveRow({})}
                  >
                    <AddIcon className="mr-1 icon-sm" /> Add new{" "}
                    {this.props.activeResourceName}
                  </Button>
                </p>

                <TextField
                  className="float-right"
                  name="search"
                  label="Search"
                />
                <Table
                  data={this.props.data}
                  fields={this.state.listModel}
                  editAction={this.edit}
                />
              </Paper>
            )}
          </Grid>
          <Grid item xs />
        </Grid>
      </Admin>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeResourceName: state.activeResourceName,
    resourceData: state.resourceData,
    data: state.resourceData[state.activeResourceName],
    fields: state.resourceFields[state.activeResourceName],
    activeRow: state.activeRow
  };
};

export default connect(mapStateToProps, {
  setActiveResourceName,
  saveResourceData,
  fetchResourceData,
  fetchResourceFields,
  setActiveRow
})(Crud);

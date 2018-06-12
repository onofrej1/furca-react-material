import React, { Component } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "./../Table";
import Form from "./../Form/Form";
import {
  fetchResourceData,
  setActiveRow,
  setActiveResourceName,
  saveResourceData
} from "./../../actions";
import Admin from "./Admin";

class Resource extends Component {
  constructor(props) {
    super(props);

    this.setResource = this.setResource.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setResource(params.resource);
  }

  componentWillReceiveProps(newProps) {
    const resource = newProps.match.params.resource;

    if (this.props.activeResourceName !== resource) {
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
    const {
      data = [],
      activeRow,
      activeResourceName,
      setActiveRow,
      resourceModel
    } = this.props;

    return (
      <Admin>
        <Grid container>
          <Grid item xs />
          <Grid item xs={activeRow ? 6 : 12}>
            {activeRow && (
              <Paper className="p-4">
                {/* <div class="bg-white border-b-2 py-2 px-1" elevation="8">
                <h3><EditIcon /> {this.props.activeResourceName}</h3>
              </div>*/}
                <h3 className="mb-3">Add/Edit {activeResourceName}</h3>
                <Form
                  fields={resourceModel.form}
                  data={activeRow}
                  onSubmit={this.onSubmit}
                />
              </Paper>
            )}

            {!activeRow && (
              <Paper className="p-4">
                <p className="float-left">
                  <Button
                    variant="contained"
                    className="btn-white"
                    size="small"
                    onClick={() => setActiveRow({})}
                  >
                    <AddIcon className="mr-1 icon-sm" /> Add new{" "}
                    {activeResourceName}
                  </Button>
                </p>

                <TextField
                  className="float-right"
                  name="search"
                  label="Search"
                />
                <Table data={data} fields={resourceModel.list} editAction={this.edit} />
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
  let resourceModel = state.activeResourceName ? state.resourceModel[state.activeResourceName] : {};

  return {
    activeResourceName: state.activeResourceName,
    data: state.resourceData[state.activeResourceName],    
    activeRow: state.activeRow,
    resourceModel: resourceModel,
  };
};

export default connect(mapStateToProps, {
  setActiveResourceName,
  fetchResourceData,
  setActiveRow,
  saveResourceData,
})(Resource);

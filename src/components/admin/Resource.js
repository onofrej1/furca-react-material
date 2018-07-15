import React, { Component } from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
    const {
      match: { params }
    } = this.props;
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

  onSubmit(values) {
    console.log(values);
    this.props.saveResourceData(this.props.activeResourceName, values);
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
        <Grid container spacing={24}>
          <Grid item xs />
          <Grid item xs={activeRow ? 8 : 12}>
            {activeRow && (
              <Card className="mb-4">
                {/* <div class="bg-white border-b-2 py-2 px-1" elevation="8">
                <h3><EditIcon /> {this.props.activeResourceName}</h3>
              </div>*/}
                <CardHeader
                  classes={{ root: "bg-secondary", title: "color-white" }}
                  title="Add/Edit record"
                />
                <CardContent>
                  <Form
                    fields={resourceModel.form}
                    data={activeRow}
                    onSubmit={this.onSubmit}
                  />
                </CardContent>
              </Card>
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
                <Table
                  data={data}
                  fields={resourceModel.list}
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
  let resourceModel = state.activeResourceName
    ? state.resourceModel[state.activeResourceName]
    : {};

  return {
    activeResourceName: state.activeResourceName,
    data: state.resourceData[state.activeResourceName],
    activeRow: state.activeRow,
    resourceModel: resourceModel
  };
};

export default connect(
  mapStateToProps,
  {
    setActiveResourceName,
    fetchResourceData,
    setActiveRow,
    saveResourceData
  }
)(Resource);

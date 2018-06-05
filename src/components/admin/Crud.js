import React, { Component } from "react";
import { connect } from "react-redux";
import Models from "./../../Models";
import TablePaginator from "./../TablePaginator";

import {
  fetchResourceData,
  fetchResourceFields,
  setActiveRow,
  saveResourceData,
  setActiveResourceName
} from "./../../actions";
import Admin from "./Admin";
import { Formik } from "formik";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DoneIcon from "@material-ui/icons/Done";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Button from "@material-ui/core/Button";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      formModel: [],
      listModel: []
    };

    this.setResource = this.setResource.bind(this);
    this.createViewModels = this.createViewModels.bind(this);
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

  createViewModels(resource) {
    let form = Models[resource].form;
    let list = Models[resource].list;

    for (var i in form) {
      var field = form[i];
      var options = [];
      if (field.type == "relation" || field.type == "pivotRelation") {
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const data = this.props.data || [];
    const activeResourceName = this.props.activeResourceName;

    const { page, rowsPerPage } = this.state;

    return (
      <Admin>
        <Grid container>
          <Grid item xs />
          <Grid item xs={this.props.activeRow ? 6 : 12}>
            <Paper style={{ display: this.props.activeRow ? "block" : "none" }}>
              {/* <div class="bg-white border-b-2 py-2 px-1" elevation="8">
                <h3><EditIcon /> {this.props.activeResourceName}</h3>
              </div>*/}

              <div className="p-4">
                <h3 className="mb-3">
                  Add/Edit {this.props.activeResourceName}
                </h3>
                {this.props.activeRow && (
                  <Formik
                    enableReinitialize={true}
                    initialValues={this.props.activeRow}
                    validate={values => {
                      const errors = {};
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                      this.props.saveResourceData(values);
                      this.props.setActiveRow(null);
                    }}
                    render={({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                    }) => (
                      <form onSubmit={handleSubmit}>
                        {this.state.formModel.map(field => {
                          let Input = null;

                          //if (field.type == "text") {
                          Input = (
                            <TextField
                              select={field.type == "relation"}
                              name={field.name}
                              label={field.name}
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[field.name]}
                            >
                              {field.options &&
                                field.options.map(opt => {
                                  return (
                                    <option value={opt.value}>
                                      {opt.text}
                                    </option>
                                  );
                                })}
                            </TextField>
                          );
                          //}

                          if (field.type == "pivotRelation") {
                            Input = <FormControl component="fieldset">
                              <FormLabel component="legend">
                                {field.field}
                              </FormLabel>
                              <FormGroup>
                                {field.options.map(option => {
                                  return <FormControlLabel                                    
                                    control={
                                      <Checkbox
                                        checked={false}
                                        onChange={handleChange}
                                        value="gilad"
                                      />
                                    }
                                    label={option.text}
                                  />
                                })}
                              </FormGroup>
                            </FormControl>;
                          }

                          return (
                            <div className="mb-8">
                              {Input}
                              {touched[field.name] &&
                                errors[field.name] && (
                                  <div>{errors[field.name]}</div>
                                )}
                            </div>
                          );
                        })}

                        <p class="float-right">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            <DoneIcon className="mr-1" /> Save
                          </Button>{" "}
                          <Button
                            type="button"
                            className="btn-white"
                            variant="contained"
                          >
                            Back
                          </Button>
                        </p>
                        <div className="clearfix" />
                      </form>
                    )}
                  />
                )}
              </div>
            </Paper>

            <div style={{ display: this.props.activeRow ? "none" : "block" }}>
              <Paper className="p-4">
                <p className="float-left">
                  <Button
                    variant="contained"
                    className="btn-white"
                    onClick={() => this.props.setActiveRow({})}
                  >
                    <AddIcon className="mr-1" /> Add new{" "}
                    {this.props.activeResourceName}
                  </Button>
                </p>

                <TextField
                  className="float-right"
                  name="search"
                  label="Search"
                />
                <Table>
                  <TableHead>
                    <TableRow>
                      {this.state.listModel.map(field => {
                        return <TableCell>{field.field}</TableCell>;
                      })}
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(row => {
                        return (
                          <TableRow key={row.id}>
                            {this.state.listModel.map(field => {
                              return (
                                <TableCell>
                                  {"render" in field
                                    ? field.render(row)
                                    : row[field.field]}
                                </TableCell>
                              );
                            })}
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.props.setActiveRow(row)}
                              >
                                <EditIcon className="mr-1" />
                                {"  "} Edit
                              </Button>{" "}
                              <Button variant="contained" color="secondary">
                                <DeleteIcon className="mr-1" /> Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell className="float-right">
                        <TablePaginator
                          count={data.length}
                          rowsPerPage={this.state.rowsPerPage}
                          page={this.state.page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </div>
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

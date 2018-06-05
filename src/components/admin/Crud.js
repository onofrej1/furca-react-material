import React, { Component } from "react";
import { connect } from "react-redux";
import Models from "./../../Models";
import TablePaginator from './../TablePaginator';

import {
  fetchResourceData,
  fetchResourceFields,
  setActiveRow,
  saveResourceData,
  setActiveResourceName
} from "./../../actions";
import Admin from "./Admin";
import { Formik } from 'formik';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from '@material-ui/core/Button';

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    };

    this.setResource = this.setResource.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setResource(params.resource);
  }

  componentWillReceiveProps(newProps) {
    const resource = newProps.match.params.resource
    if(this.props.activeResourceName != resource) {
      this.setResource(resource);
    }
  }

  setResource(resource) {
    this.props.setActiveResourceName(resource);
    this.props.fetchResourceData(resource);
    this.props.fetchResourceFields(resource);
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
    const list = activeResourceName ? Models[activeResourceName].list.map(field => field.field) : [];
    const form = activeResourceName ? Models[activeResourceName].form : [];
    const {page, rowsPerPage} = this.state;
    let formData = {title: 'aaaa'};
    console.log(this.props.activeRow);

    return (
      <Admin>

        <Grid container>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}>
        <Paper>

          <Paper class="bg-primary" style={{padding:'10px'}} elevation="8">
            <h3 style={{margin:0}}>
            {this.props.activeResourceName}
            </h3>
          </Paper>

        <div className="crud-form-wrapper" style={{display: this.props.activeRow ? 'block': 'block'}}>

        {this.props.activeRow && <Formik
              enableReinitialize={true}
              initialValues={this.props.activeRow}
              validate={values => {
                const errors = {};
                return errors;
              }}
              onSubmit={(
                values,
                { setSubmitting, setErrors}
              ) => {
                console.log('data', values);
                }
              }
              render={({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                {form.map(field => {
                  return <TextField
                    id={field.name}
                    name={field.name}
                    label={field.name}
                    className="block-field"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[field.name]}
                  />
                  {touched[field.name] && errors[field.name] && <div>{errors[field.name]}</div>}
                  <br />
                })}

                <p>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </p>
                </form>
              )}
            />}
            </div>
            </Paper>
        </Grid>
        <Grid item xs>

        </Grid>
        </Grid>

        <div style={{display: this.props.activeRow ? 'none': 'block'}}>
        <Paper>
        <p style={{padding: 15}}>
        <Button variant="contained" color="default" size="small" onClick={() => this.props.setActiveRow({})}>
          <AddIcon style={{ fontSize: 15 }} />{'  '} Add new
        </Button>
        </p>
          <Table>
            <TableHead>
              <TableRow>
                {list.map(field => {
                  return <TableCell>{field}</TableCell>;
                })}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    {list.map(field => {
                      return <TableCell>{row[field]}</TableCell>
                    })}
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={() => this.props.setActiveRow(row)}>
                        <EditIcon style={{ fontSize: 15 }} />{'  '} Edit
                      </Button>{' '}
                      <Button variant="contained" color="secondary" size="small">
                        <DeleteIcon style={{ fontSize: 15 }} />{' '} Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
               <TableCell>
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

      </Admin>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeResourceName: state.activeResourceName,
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

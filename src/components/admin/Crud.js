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

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Crud extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setResource = this.setResource.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setResource(params.resource);
  }

  componentWillReceiveProps(newProps) {
    this.setResource(newProps.match.params.resource);
  }

  setResource(resource) {
    this.props.setActiveResourceName(resource);
    this.props.fetchResourceData(resource);
    this.props.fetchResourceFields(resource);
  }

  render() {
    const data = this.props.data || [];
    const fields = this.props.fields || [];
    console.log("fields", fields);

    return (
      <Admin>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map(field => {
                  return <TableCell>{field}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => {
                return (
                  <TableRow key={row.id}>
                    {fields.map(field => {
                      return <TableCell>{row[field]}</TableCell>
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Admin>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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

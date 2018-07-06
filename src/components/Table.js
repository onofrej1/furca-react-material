import React, { Component } from "react";
import TablePaginator from "./TablePaginator";

import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import {Actions} from "./Actions";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentWillReceiveProps(newProps)
  {
      //todo
  }

  render() {
    const { data = [], fields, editAction } = this.props;
    const { page, rowsPerPage } = this.state;

    if(!fields) return <div></div>

    return (
      <MaterialTable>
        <TableHead>
          <TableRow>
            {fields.map(field => {
              return <TableCell key={field.name}>{field.name}</TableCell>;
            })}
            {editAction && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow key={row.id}>
                  {fields.map(field => {
                    return (
                      <TableCell key={field.name}>
                        {"render" in field
                          ? field.render(row)
                          : row[field.name]}
                      </TableCell>
                    );
                  })}
                  {editAction && <Actions editAction={() => editAction(row)} />}
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="flex" colSpan={3}>
              <TablePaginator
                className="justify-center"
                count={data.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </MaterialTable>
    );
  }
}

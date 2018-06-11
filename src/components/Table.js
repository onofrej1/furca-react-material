import React, { Component } from "react";
import TablePaginator from "./TablePaginator";

import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
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

  render() {
    const { data = [], fields, editAction } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <MaterialTable>
        <TableHead>
          <TableRow>
            {fields.map(field => {
              return <TableCell>{field.field}</TableCell>;
            })}
            <TableCell>Action</TableCell>
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
                      <TableCell>
                        {"render" in field
                          ? field.render(row)
                          : row[field.field]}
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
            <TableCell className="flex" colspan={3}>
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

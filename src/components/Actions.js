import React from "react";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

export const Actions = ({editAction, deleteAction}) =>
<TableCell className="whitespace-no-wrap">
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={() => editAction()}
  >
    <EditIcon className="mr-1 icon-sm" />
    {"  "} Edit
  </Button>{" "}
  <Button variant="contained" color="secondary" size="small">
    <DeleteIcon className="mr-1 icon-sm" /> Delete
  </Button>
</TableCell>

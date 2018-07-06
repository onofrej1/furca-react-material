import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Layout extends Component {
  render() {
    let { contentTitle } = this.props;

    return (
      <Grid container fluid spacing={24}>
        <Grid item md={1} />
        <Grid item md={10}>
          <Paper className="pt-4 mb-4">
            <div className="box-heading p-2 mb-2">{contentTitle}</div>
            <div className="p-4">{this.props.children}</div>
          </Paper>
        </Grid>
        <Grid item md={1} />
      </Grid>
    );
  }
}

export default Layout;

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class SidebarLayout extends Component {
  render() {
    let { contentTitle } = this.props;

    return (
        <Grid container fluid spacing={24}>
          <Grid item md={1}  />
          <Grid item md={7}>
            <div className="box-stripe">
              <div className="box-stripe-heading">{contentTitle}</div>
              {this.props.children}
            </div>
          </Grid>
          <Grid item md={3}>
            <div className="box-stripe">
              <div className="box-stripe-heading">Aktuality</div>
              aktuality
            </div>
          </Grid>
          <Grid item md={1} />
        </Grid>
    );
  }
}

export default SidebarLayout;

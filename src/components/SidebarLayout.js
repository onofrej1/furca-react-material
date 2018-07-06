import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { fetchResourceData } from "./../actions";
import { connect } from "react-redux";

class SidebarLayout extends Component {

  componentDidMount() {
    this.props.fetchResourceData("news", "filter[published][eq]=1");
  }

  render() {
    let { contentTitle, data} = this.props;

    return (
      <Grid container fluid spacing={24}>
        <Grid item md={1} />
        <Grid item md={7}>
          <Paper className="pt-4 mb-4">
            <div className="box-heading p-2 mb-2">{contentTitle}</div>
            <div className="p-4">{this.props.children}</div>
          </Paper>
        </Grid>
        <Grid item md={3}>
          <Paper className="pt-4 mb-4">
            <div className="box-heading p-2 mb-2">Aktuality</div>
            <div className="p-4">
            {data.map(message => {
              return (
                <div>
                  <div className="border-b-2 mb-4" dangerouslySetInnerHTML={{__html:message.message}} />

                </div>
              )
            })}
            </div>
          </Paper>
        </Grid>
        <Grid item md={1} />
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let data = state.resourceData.news ? state.resourceData.news : [];

  return {
    data: data
  };
};

export default connect(mapStateToProps, {
  fetchResourceData
})(SidebarLayout);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ListIcon from "@material-ui/icons/Apps";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import Models from "./../../Models";
import { Header } from "./Header";
import {
  fetchResourceData,
  fetchResourceFields,
  setActiveResourceName,
  setActiveRow
} from "./../../actions";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setResource = this.setResource.bind(this);
    //this.setContent = this.setContent.bind(this);
  }

  setResource(name) {
    this.props.setActiveRow(null);
    this.props.history.push("/admin/resource/" + name);
  }

  render() {
    const resources = Object.keys(Models);

    const ResourcesMenu = () => {
      return resources.map(resource => (
        <ListItem
          key={resource}
          button
          onClick={() => this.setResource(resource)}
        >
          <ListItemIcon>
            <ListIcon style={{ fontSize: 35 }} />
          </ListItemIcon>
          <ListItemText primary={resource} />
        </ListItem>
      ));
    };

    return (
      <div>
        <Header />
        <Grid container>
          <Grid item xs={2}>
            <div className="nav-wrapper">
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Select table" />
                </ListItem>
                <Divider />
                <ResourcesMenu />
              </List>
              <Divider />
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={10}>
            <Grid container justify="center">
              <Grid item xs={11}>
                <br />
                {this.props.children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(null, {
  setActiveResourceName,
  fetchResourceData,
  fetchResourceFields,
  setActiveRow
})(withRouter(Admin));

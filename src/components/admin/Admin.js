import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import Crud from "./Crud";
import Models from "./../../Models";
import {
  fetchResourceData,
  fetchResourceFields,
  setActiveResourceName,
  setActiveRow,
  saveResourceData
} from "./../../actions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Grid from "@material-ui/core/Grid";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setResource = this.setResource.bind(this);
    //this.setContent = this.setContent.bind(this);
  }

  setResource(name) {
    this.props.history.push("/admin/crud/" + name);
  }

  render() {
    const resources = Object.keys(Models);

    return (
      <div>
        <Grid container>
          <Grid item xs={3}>
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={9}>
            <AppBar position="static">
              <Toolbar>
                <Grid container alignItems="center">
                  <Grid>
                    <img src="/images/furca-logo.png" style={{ height: 50 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="title" color="inherit">
                      <span>O5 Bezecky klub Furca</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <div
              style={{ borderRight: "1px solid lightgray", minHeight: "800px" }}
            >
              <List component="nav">
                {resources.map(resource => (
                  <ListItem button onClick={() => this.setResource(resource)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={resource} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={9}>
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

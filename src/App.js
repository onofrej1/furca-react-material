import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Crud from "./components/admin/Crud";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Page from "./components/Page";

class App extends Component {
  render() {
    let location = this.props.location.pathname;

    if (location.startsWith("/admin")) {
      return (
        <Switch>
          <Route path={"/admin/crud/:resource"} component={Crud} />
        </Switch>
      );
    }

    return (
      <div>
        <Page />
      </div>
    );
  }
}

export default withRouter(App);

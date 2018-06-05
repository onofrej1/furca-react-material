import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Crud from "./components/admin/Crud";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Page from "./components/Page";
import { withTheme } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: 'red',
      main: '#fff',
      dark: 'red',
      contrastText: '#fff',
    },
    secondary: {
      light: 'green',
      main: 'blue',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

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
      <MuiThemeProvider theme={theme}>
      <div>
        <Page />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default withRouter(App);

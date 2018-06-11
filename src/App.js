import React, { Component } from "react";
import "./App.css";
import Resource from "./components/admin/Resource";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Page from "./components/Page";

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
          <Route path={"/admin/resource/:resource"} component={Resource} />
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

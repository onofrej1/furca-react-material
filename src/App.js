import React, { Component } from "react";
import Resource from "./components/admin/Resource";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Page from "./components/Page";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Auth from "./components/Authorization";

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
    const menuItems = [];

    if (location.startsWith("/admin")) {
      return (
        <Switch>
          <Route path={"/admin/resource/:resource"} component={Resource} />
        </Switch>
      );
    }

    return (
        <div>
          <Header menusItem={menuItems} />
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/page/:id" component={Auth(['ADMIN'])(Page)} />
            </Switch>
          <Footer />
       </div>
    );
  }
}

export default withRouter(App);

import React, { Component } from "react";
import Resource from "./components/admin/Resource";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Page from "./components/Page";
import Header from './components/Header';
import Footer from './components/Footer';

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
          <Header />
            <Switch>
              <Route path="/page" component={Page} />
            </Switch>
          <Footer />
       </div>
    </MuiThemeProvider>
    );
  }
}

export default withRouter(App);

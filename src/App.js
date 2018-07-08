import React, { Component } from "react";
import Resource from "./components/admin/Resource";
import { Route, Switch, withRouter } from "react-router-dom";
import Page from "./components/Page";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Auth from "./components/Authorization";
import Results from './components/Results';
import Hamburg from './components/Hamburg';
import Guestbook from './components/Guestbook';

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
              <Route path="/page/:id" component={Page} />
              <Route path="/vysledky" component={Results} />
              <Route path="/hamburg" component={Hamburg} />
              <Route path="/guestbook" component={Guestbook} />
            </Switch>
          <Footer />
       </div>
    );
  }
}

export default withRouter(App);

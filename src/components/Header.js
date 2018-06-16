import React, { Component } from "react";
import header from "./../assets/images/header.jpg";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Menu from "./Menu";

class Header extends Component {
  render() {
    return (
      <div className="mb-4">
        <img src={header} alt="header" width="100%" style={{display:'block'}} />
        <AppBar position="staticxx" color="default" className="toolbar">
          <Menu />
        </AppBar>
      </div>
    );
  }
}

export default Header;

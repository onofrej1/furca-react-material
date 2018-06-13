import React, { Component } from "react";
import header from "./../assets/images/header.jpg";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Manager, Target, Popper } from 'react-popper';
//import Menu from "./Menu";

class Header extends Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <div>
          <img src={header} alt="header" width="100%" />
        </div>
        <AppBar position="static" color="default" className="toolbar">
          <div style={{height:'45px', lineHeight: '45px'}} >
            <span className="pr-4">aaaa</span><span>bbbb</span>
            <Popper
                        placement="bottom-start"
                        eventsEnabled={this.state.open}

                      >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={this.state.open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
            </Popper>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Manager, Target, Popper } from "react-popper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class DropdownMenu extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = event => {
    if (this.target1.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    let { open } = this.state;

    const { menu } = this.props;

    return (
      <Manager>
        <Target>
          <span
            ref={node => {
              this.target1 = node;
            }}
          >
            <Button
              component="span"
              onClick={this.handleToggle}
              style={{ color: "#9d9d9d" }}
            >
              {menu.item.title}
            </Button>
          </span>
        </Target>
        <Popper placement="bottom-start" eventsEnabled={open} >
          <ClickAwayListener onClickAway={this.handleClose}>
            <Grow in={open} style={{ transformOrigin: "0 0 0" }}>
              <Paper>
                <MenuList role="menu">
                  {menu.children.map(child => {
                    return (
                      <MenuItem onClick={this.handleClose}>
                        <Link
                          className="menu-link"
                          style={{ color: "black" }}
                          to={"/page/" + child.page_id}
                        >
                          {child.title}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    );
  }
}

export default DropdownMenu;

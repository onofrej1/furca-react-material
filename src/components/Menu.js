import React, { Component } from "react";

import { fetchResourceData } from "./../actions";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Manager, Target, Popper } from "react-popper";
import Button from "@material-ui/core/Button";

class Menu extends Component {
  static defaultProps = {
    menuItems: []
  };

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

  componentDidMount() {
    this.props.fetchResourceData("menuItem");
  }

  render() {
    let { open } = this.state;
    let menuItems = this.props.menuItems;

    if (!menuItems) {
      return <div>no items</div>;
    }

    let menuTree = [];

    for (let i in menuItems) {
      let menuItem = menuItems[i];
      let item = {
        item: menuItem,
        children: menuItems.filter(i => i.parent_id === menuItem.id)
      };
      menuTree.push(item);
    }
    console.log("tree", menuItems);

    return (
      <div style={{ height: "58px", lineHeight: "58px" }} className="flex">
        {menuTree.filter(menu => menu.item.parent_id === null).map(menu => {
          if (menu.children.length === 0) {
            let link = menu.item.page_id
              ? "/page/" + menu.item.page_id
              : menu.item.link;
            const isExternalLink = /^https?:\/\//.test(link);
            return isExternalLink ? (
              <a href={link} className="menu-link mr-6">
                {menu.item.title}
              </a>
            ) : (
              <Link className="menu-link mr-6" to={link}>
                {menu.item.title}
              </Link>
            );
          }

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
              <Popper placement="bottom-start" eventsEnabled={open}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grow in={open} style={{ transformOrigin: "0 0 0" }}>
                    <Paper>
                      <MenuList role="menu">
                        {menu.children.map(child => {
                          return (
                            <MenuItem onClick={this.handleClose}>
                              <Link
                                className="dropdown-item"
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
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    menuItems: state.resourceData.menuItem
  };
};

export default connect(mapStateToProps, {
  fetchResourceData
})(Menu);

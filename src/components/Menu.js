import React, { Component } from "react";

import { fetchResourceData } from "./../actions";
import { connect } from "react-redux";
import DropdownMenu from './DropdownMenu';
import { Link } from "react-router-dom";

class Menu extends Component {
  static defaultProps = {
    menuItems: []
  };

  componentDidMount() {
    this.props.fetchResourceData("menuItem");
  }

  render() {
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
            <DropdownMenu menu={menu} />
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

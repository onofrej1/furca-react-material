import React, { Component } from "react";
import RichEditor from "./Form/RichEditor";
import SidebarLayout from "./SidebarLayout";
import { fetchResourceData } from "./../actions";
import { connect } from "react-redux";

class Page extends Component {
  componentDidMount() {
    this.props.fetchResourceData("page");
  }

  render() {
    const { match: { params }, pages } = this.props;

    const page = pages && pages.find(page => page.id == params.id);
    if (!page) return <span />;

    return (
      <SidebarLayout contentTitle={page.title}>
        {/*<RichEditor data={page.body} readOnly />*/}
        <div dangerouslySetInnerHTML={{__html:page.body}} />
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let pages = state.resourceData.page ? state.resourceData.page : [];

  return {
    pages: pages
  };
};

export default connect(mapStateToProps, {
  fetchResourceData
})(Page);

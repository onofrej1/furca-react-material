import React, { Component } from "react";
import SidebarLayout from "./SidebarLayout";
import Html from "slate-html-serializer";
import { fetchResourceData } from "./../actions";
import { connect } from "react-redux";
import SlateEditor from "./Slate/SlateEditor";

class Page extends Component {

  constructor(props) {
    super(props);
  }

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
        <SlateEditor readOnly value={page.body} setValue={() => {}} />
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

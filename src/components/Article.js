import React, { Component } from "react";
import { connect } from "react-redux";
import SidebarLayout from "./Common/SidebarLayout";
import { fetchResourceData } from "./../actions/index";

class Article extends Component {
  render() {
    let { article } = this.props;

    return (
      <SidebarLayout contentTitle="Clanok">
        <h3>{article.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: article.content }} />
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  let article = state.resources.articles.data.find(
    article => article.id === parseInt(id, 10)
  );

  return {
    article
  };
};

export default connect(mapStateToProps, { fetchResourceData })(Article);

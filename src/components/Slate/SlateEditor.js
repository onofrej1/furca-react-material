import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import initialValue from "./value.json";
import { isKeyHotkey } from "is-hotkey";
import { Button, Icon, Toolbar } from "./SlateEditorComponents";
import Html from "slate-html-serializer";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FileList from "./FileList";
import { Block } from 'slate';
import "./../../assets/css/thumbnails.css";
import TablePlugin from './TablePlugin';

const DEFAULT_NODE = "paragraph";


/**
 * Source: https://github.com/ianstormtaylor/slate/blob/master/examples/rich-text/index.js
 */
class SlateEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: Value.fromJSON(this.parseValue(props.value)),
      modalIsOpen: false
    };

    this.chooseFile = this.chooseFile.bind(this);
  }

  componentWillReceiveProps(props) {
    /*this.setState({
      value: Value.fromJSON(this.parseValue(props.value)),
      modalIsOpen: false
    });*/
  }

  parseValue(value) {
    const html = new Html({});
    let parsedValue = "";

    try {
      parsedValue = JSON.parse(value);
    } catch (e) {
      parsedValue = html.deserialize(value);
    }
    return parsedValue;
  }

  chooseFile(filePath) {
    this.setState({ modalIsOpen: false });
    const change = this.state.value.change().call(this.insertImage, filePath);
    this.onChange(change);
  }

  insertImage = (change, src, target) => {
    if (target) {
      change.select(target);
    }

    change.insertBlock({
      type: "image",
      isVoid: true,
      data: { src, className: "img-bordered" }
    });
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
  };

  menu = () => <div id="contextMenu">context menu</div>



  render() {

    const tablePlugin = TablePlugin(this.state.value, this.onChange);
    const plugins = [tablePlugin];

    if (this.props.readOnly) {
      return (
        <Editor
          plugins={plugins}
          spellCheck={false}
          value={this.state.value}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      );
    }

    return (
      <div>
        <Toolbar>
          {this.renderMarkButton("bold", "format_bold")}
          {this.renderMarkButton("italic", "format_italic")}
          {this.renderMarkButton("underlined", "format_underlined")}
          {this.renderMarkButton("code", "code")}
          {this.renderBlockButton("heading-one", "looks_one")}
          {this.renderBlockButton("heading-two", "looks_two")}
          {this.renderBlockButton("heading-three", "looks_3")}
          {this.renderBlockButton("heading-four", "looks_4")}
          {this.renderBlockButton("block-quote", "format_quote")}
          {this.renderBlockButton("numbered-list", "format_list_numbered")}
          {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
          <Button onMouseDown={this.onClickImage}>
            <Icon>image</Icon>
          </Button>
          <Button onMouseDown={this.addTable}>
            <Icon>table</Icon>
          </Button>
          <Button onMouseDown={tablePlugin.addRowTop}>
            Top
          </Button>
          <Button onMouseDown={tablePlugin.addRowBottom}>
            Bottom
          </Button>
          <Button onMouseDown={this.addCell}>
            Add cell
          </Button>
        </Toolbar>
        <Editor
          plugins={plugins}
          spellCheck={false}
          autoFocus
          value={this.state.value}
          onChange={this.onChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />

        <FileList
          modalIsOpen={this.state.modalIsOpen}
          chooseFile={this.chooseFile}
        />
      </div>
    );
  }

  onClickImage = event => {
    event.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  addTable = event => {
    event.preventDefault();
    const value = this.state.value;
    const change = value.change();

    change.insertBlock({
      type: "table",
      nodes: []
    });

    this.onChange(change);
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const { value } = this.state;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock("list-item") && parent && parent.type === type;
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "heading-three":
        return <h3 {...attributes}>{children}</h3>;
      case "heading-four":
        return <h4 {...attributes}>{children}</h4>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "image":
        const src = node.data.get("src");
        const className = node.data.get("className");
        return <img src={src} className={className} {...attributes} />;
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
    }
  };

  onChange = ({ value }) => {
    this.props.setValue(this.props.name, JSON.stringify(value.toJSON()));
    this.setState({ value });
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type != "bulleted-list" && type != "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        change
          .unwrapBlock(
            type == "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        change.setBlocks("list-item").wrapBlock(type);
      }
    }

    this.onChange(change);
  };
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(SlateEditor);

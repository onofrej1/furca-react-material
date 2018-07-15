import { Editor } from "slate-react";
import { Value } from "slate";

import React from "react";
import initialValue from "./value.json";
import { isKeyHotkey } from "is-hotkey";
import { Button, Icon, Toolbar } from "./SlateEditorComponents";
import Html from "slate-html-serializer";
import Modal from "react-modal";
import AppBar from "@material-ui/core/AppBar";
import { fetchFiles } from "./../actions";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./../assets/css/thumbnails.css";

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = "paragraph";

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

/**
 * The rich text example.
 * Source: https://github.com/ianstormtaylor/slate/blob/master/examples/rich-text/index.js
 *
 * @type {Component}
 */

class SlateEditor extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  constructor(props) {
    const html = new Html({});

    super(props);
    let value = "";

    try {
      value = JSON.parse(props.field.value);
    } catch (e) {
      value = html.deserialize(props.field.value);
    }

    console.log(props.field.value);

    this.state = {
      value: Value.fromJSON(value),
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    //console.log(this.state.value);
  }

  chooseFile(filePath) {
    const change = this.state.value.change().call(this.insertImage, filePath);
    this.onChange(change);
    this.setState({ modalIsOpen: false });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  insertImage = (change, src, target) => {
    if (target) {
      change.select(target);
    }

    change.insertBlock({
      type: "image",
      isVoid: true,
      data: { src }
    });
  };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type == type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
  };

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    console.log("files", this.props.files);

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
        </Toolbar>
        <Editor
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            overlay: {},
            content: { width: "80%", margin: "auto", padding: 0 }
          }}
          contentLabel="Example Modal"
        >
          <AppBar position="static" style={{ padding: 10 }}>
            <h4>modal content</h4>
          </AppBar>
          <Grid
            container
            spacing={16}
            className="p-4"
            alignItems="center"
          >
            {this.props.files.map(file => {
              let src = this.props.baseUrl + "/"+file.path;
              return (
                <Grid item >
                  <div className="thumbnail">
                    {file.type == 'dir' && <img
                      src={this.props.baseUrl + "/obrazky/folder.png"}
                      className={file.isPortrait ? 'portrait': ''}
                    />}
                    {file.type != 'dir' && file.isImage && <img
                      src={src}
                      className={file.isPortrait ? 'portrait': ''}
                      onClick={() => this.chooseFile(src)}
                    />}
                    {file.type != 'dir' && !file.isImage && <img
                      src={this.props.baseUrl + "/obrazky/no_preview.jpg"}
                      className={file.isPortrait ? 'portrait': ''}
                      onClick={() => this.chooseFile(src)}
                    />}

                  </div>
                  <div className="text-center border border-gray p-2">{file.name}</div>
                </Grid>
              );
            })}
          </Grid>
        </Modal>
      </div>
    );
  }

  onClickImage = event => {
    event.preventDefault();
    this.setState({ modalIsOpen: true });
    const src = "";
    //const src = window.prompt('Enter the URL of the image:')
    //if (!src) return

    //const change = this.state.value.change().call(this.insertImage, src);
    //this.onChange(change);
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

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

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

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

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

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
        return <img src={src} {...attributes} />;
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

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

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.props.setFieldValue(
      this.props.field.name,
      JSON.stringify(value.toJSON())
    );
    this.setState({ value });
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

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

  componentDidMount() {
    this.props.fetchFiles("obrazky");
  }
}

/**
 * Export.
 */

const mapStateToProps = (state, ownProps) => {
  let files = state.files || [];

  return {
    baseUrl: state.baseUrl,
    files
  };
};

export default connect(
  mapStateToProps,
  {
    fetchFiles
  }
)(SlateEditor);

import React from "react";
import "./../../richtext-editor.css";
import {
  Editor,
  ContentState,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertFromHTML,
  convertToRaw,
  ContentBlock,
  Modifier,
  DefaultDraftBlockRenderMap
} from "draft-js";

//import Immutable from 'immutable';
import { OrderedMap, List } from 'immutable';
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Button from "@material-ui/core/Button";

const Immutable = require("immutable");

const blockRenderMap = Immutable.Map({
  'section': {
    element: "h3"
  }
});

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

function getBlockStyle(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'unstyled') {
    return 'border-block';
  }
  if (type === 'section') {
    return 'section-block';
  }
}

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
      this.setState({ editorState });
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      this.props.onChange(this.props.name, content);
    };

    this.onTab = e => this.onTab(e);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.createState = this.createState.bind(this);
    this.addSection = this.addSection.bind(this);
  }

  addSection() {
    console.log("add section");
    let content = this.state.editorState.getCurrentContent();

    var selectionState = this.state.editorState.getSelection();
    var anchorKey = selectionState.getStartKey();
    var blockMap = content.getBlockMap();
    var block = blockMap.get(anchorKey);
    console.log(block.getType());

    const newBlock = new ContentBlock({
      key: ID(),
      type: 'section',
      text: 'pridany'
    });
    console.log(newBlock.getType());

    let fragment = OrderedMap();
    fragment = fragment.set(newBlock.key, newBlock);
    console.log(fragment);

    /*let newContent = Modifier.replaceWithFragment(
      content,
      selectionState,
      fragment
    );*/
    //console.log(newContent.getBlockMap().last().getType());

    const newBlockMap = content.getBlockMap().set(anchorKey, newBlock);
    let newState = EditorState.push(this.state.editorState,
      ContentState.createFromBlockArray(newBlockMap.toArray()));
    //let newState = EditorState.push(this.state.editorState, newContent, 'insert-fragment');

    this.onChange(newState);
    //console.log(content.getFirstBlock());
  }

  createState(data) {
    let { editorState } = this.state;
    if (data) {
      let content = null;
      try {
        content = convertFromRaw(JSON.parse(data));
      } catch (e) {
        const htmlBlocks = convertFromHTML(data);
        content = ContentState.createFromBlockArray(
          htmlBlocks.contentBlocks,
          htmlBlocks.entityMap
        );
      }
      editorState = EditorState.createWithContent(content);
    }
    this.setState({ editorState });
  }

  componentDidMount() {
    this.createState(this.props.data);
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    console.log("toggle", inlineStyle);
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    if (this.props.readOnly) {
      return <Editor editorState={editorState} readOnly />;
    }

    return (
      <div className="editor-wrapper">
        <div className="editor-controls">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <span onClick={this.addSection}>section</span>
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <div className="editor-content" onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            blockRenderMap={extendedBlockRenderMap}
            editorState={editorState}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return 'border-block';
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.icon ? (
          <Button variant="contained" color="default" size="small">
            <this.props.icon />
          </Button>
        ) : (
          this.props.label
        )}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { icon: FormatBoldIcon, label: "Bold", style: "BOLD" },
  { icon: FormatItalicIcon, label: "Italic", style: "ITALIC" },
  { icon: FormatUnderlinedIcon, label: "Underline", style: "UNDERLINE" },
  { icon: KeyboardIcon, label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          icon={type.icon}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

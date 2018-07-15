import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { fetchFiles } from "./../../actions";
import { connect } from "react-redux";
import Modal from "react-modal";

class FileList extends Component {

  componentDidMount() {
    this.props.fetchFiles("obrazky");
  }

  chooseFile(file) {
    this.props.chooseFile(file);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.closeModal}
        style={{
          content: { width: "80%", padding: 0 }
        }}
      >
        <AppBar position="static" style={{ padding: 10 }}>
          <h4>Choose file</h4>
        </AppBar>
        <Grid container spacing={16} className="p-4" alignItems="center">
          {this.props.files.map(file => {
            let src = this.props.baseUrl + "/" + file.path;
            return (
              <Grid item>
                <div className="thumbnail">
                  {file.type == "dir" && (
                    <img
                      src={this.props.baseUrl + "/obrazky/folder.png"}
                      className={file.isPortrait ? "portrait" : ""}
                    />
                  )}
                  {file.type != "dir" &&
                    file.isImage && (
                      <img
                        src={src}
                        className={file.isPortrait ? "portrait" : ""}
                        onClick={() => this.chooseFile(src)}
                      />
                    )}
                  {file.type != "dir" &&
                    !file.isImage && (
                      <img
                        src={this.props.baseUrl + "/obrazky/no_preview.jpg"}
                        className={file.isPortrait ? "portrait" : ""}
                        onClick={() => this.chooseFile(src)}
                      />
                    )}
                </div>
                <div className="text-center border border-gray p-2">
                  {file.name}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Modal>
    );
  }
}

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
)(FileList);

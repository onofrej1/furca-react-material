import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";
import axios from "axios";
import Table from "./Table";
import { fetchResourceData } from "./../actions";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";

class Hamburg extends Component {
  componentDidMount() {
    this.props.fetchResourceData("hamburg");
  }

  onHamburgEventChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    axios
      .get(this.props.baseUrl + "/hamburg/results/" + e.target.value)
      .then(result => {
        console.log(result);
        this.setState({ results: result.data });
      });
  }

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = { results: [], hamburg: "" };
  }

  render() {
    return (
      <Layout contentTitle="Hamburg vysledky">
        <FormControl className="w-1/3">
          <InputLabel htmlFor="hamburg">Vyberte podujatie</InputLabel>
          <Select
            value={this.state.hamburg}
            name="hamburg"
            onChange={e => this.onHamburgEventChange(e)}
            input={<Input id="hamburg" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.data.map(hamburg => {
              return <MenuItem value={hamburg.id}>{hamburg.title}</MenuItem>;
            })}
            <MenuItem value={3}>Štafetový maratón</MenuItem>
          </Select>
        </FormControl>

        {this.state.results && (
          <MaterialTable>
            <TableHead>
              <TableRow>
                {this.state.results[0] &&
                  this.state.results[0].map(field => {
                    return <TableCell key={field}>{field}</TableCell>;
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.results.slice(1).map(row => {
                return (
                  <TableRow>
                    {row.map(field => {
                      return <TableCell key={field}>{field}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MaterialTable>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    baseUrl: state.baseUrl,
    data: state.resourceData.hamburg
  };
};

export default connect(
  mapStateToProps,
  { fetchResourceData }
)(Hamburg);

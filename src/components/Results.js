import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResourceData } from "./../actions/index";
import axios from "axios";
import Layout from "./Layout";
import Table from "./Table";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], events: [], run_id: "", event_id: "" };
    this.getEvents = this.getEvents.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  static defaultProps = {
    events: { data: [] }
  };

  getEvents(e) {
    let events = this.props.events;
    events = events.filter(
      event => event.run_id === parseInt(e.target.value, 10)
    );
    this.setState({ events });
    this.setState({ results: [] });
    this.setState({ [e.target.name]: e.target.value });
  }

  getResults(e) {
    this.setState({ [e.target.name]: e.target.value });
    const url =
      this.props.baseUrl +
      "/result?sort=place,asc&with=runner&filter[event_id][eq]=" +
      e.target.value;
    axios.get(url).then(
      result => {
        this.setState({ results: result.data });
      },
      error => console.log(error)
    );
  }

  componentDidMount() {
    this.props.fetchResourceData("event");
  }

  render() {
    if (!this.state.events) {
      return <div />;
    }

    let columns = [
      { label: "Poradie", name: "place" },
      {
        label: "Meno", name: "runner",
        render: row => `${row.runner.last_name} ${row.runner.first_name}`
      },
      { label: "Team", name: "team" },
      { label: "Cas", name: "finish_time" }
    ];

    return (
      <Layout contentTitle="Výsledky">
        <Grid container spacing={8}>
          <Grid item md={4}>
            <FormControl className="w-full">
              <InputLabel htmlFor="run-id">Vyberte podujatie</InputLabel>
              <Select
                value={this.state.run_id}
                onChange={e => this.getEvents(e)}
                name="run_id"
                input={<Input id="run-id" />}
                floatingLabelFixed={true}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Furčiansky maratón</MenuItem>
                <MenuItem value={2}>eXtrém maratón</MenuItem>
                <MenuItem value={3}>Štafetový maratón</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl className="w-full">
              <InputLabel htmlFor="run_id">Vyberte rocnik</InputLabel>
              <Select
                value={this.state.event_id}
                onChange={e => this.getResults(e)}
                input={<Input name="event_id" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.events.map(event => {
                  return (
                    <MenuItem value={event.id}>
                      {event.edition}.r {event.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className="">
          <Table data={this.state.results} fields={columns} />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    baseUrl: state.baseUrl,
    events: state.resourceData.event
  };
};

export default connect(
  mapStateToProps,
  { fetchResourceData }
)(Results);

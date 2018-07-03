import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form/Form";
import { register } from "./../actions/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  static defaultProps = {
    events: { data: [] }
  };

  register(values) {
    this.props.register(values.name, values.email, values.password, values.password_confirmation);
  }

  render() {
    if (this.props.user) {
      this.props.history.push("/");
    }

    let fields = [
      { name: "name", type: "text" },
      { name: "email", type: "text" },
      { name: "password", type: "text" },
      { name: "password_confirmation", type: "text" }
    ];

    return (
      <Grid container fluid spacing={24}>
        <Grid item md={4} />
        <Grid item md={4}>
          <Paper className="p-4 mb-4">
            <Form fields={fields} data={{}} onSubmit={this.register} />
          </Paper>
        </Grid>
        <Grid item md={4} />
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { register })(Register);

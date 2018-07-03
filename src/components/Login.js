import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form/Form";
import { login } from "./../actions/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  static defaultProps = {
    events: { data: [] }
  };

  login(values) {
    this.props.login(values.email, values.password);
  }

  render() {
    if (this.props.user) {
      this.props.history.push("/");
    }

    let fields = [
      { name: "email", type: "text" },
      { name: "password", type: "text" }
    ];

    return (
      <Grid container fluid spacing={24}>
        <Grid item md={4} />
        <Grid item md={4}>
          <Paper className="p-4 mb-4">
            <Form fields={fields} data={{}} onSubmit={this.login} />
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

export default connect(mapStateToProps, { login })(Login);

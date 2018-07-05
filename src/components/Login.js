import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form/Form";
import { login } from "./../actions/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LockIcon from "@material-ui/icons/Lock";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

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
    this.props.history.push("/");
  }

  render() {
    if (this.props.user) {
      this.props.history.push("/");
    }

    const nameInputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <AccountBoxIcon />
        </InputAdornment>
      )
    };

    const passwordInputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <LockIcon />
        </InputAdornment>
      )
    };

    let fields = [
      { name: "email", type: "text", inputProps: nameInputProps },
      { name: "password", type: "password", inputProps: passwordInputProps }
    ];

    const Buttons = () => (
      <p className="float-rightxx">
        <Button
          type="submit"
          className="w-full"
          variant="contained"
          color="secondary"
        >
          Login
        </Button>{" "}
      </p>
    );

    return (
      <Grid container fluid spacing={24}>
        <Grid item md={4} />
        <Grid item md={4}>
          <Card className="p-0 mb-4">
            <CardHeader classes={{root: 'border-b-2 border-black p-3 text-center', title: 'text-white text-bold'}} title="Login">

            </CardHeader>
            <CardContent>
              <Form
                fields={fields}
                data={{}}
                onSubmit={this.login}
                buttons={Buttons}
              />
            </CardContent>
          </Card>
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

export default connect(
  mapStateToProps,
  { login }
)(Login);

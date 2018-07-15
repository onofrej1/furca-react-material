import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form/Form";
import { login } from "./../actions/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import SidebarLayout from "./SidebarLayout";

import { saveResourceData, fetchResourceData } from "./../actions";

class Guestbook extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = { form: false };
  }

  componentDidMount() {
    this.props.fetchResourceData("guestbook");
  }

  static defaultProps = {
    messages: []
  };

  submit(values) {
    console.log("submit", values);
    this.props.saveResourceData("guestbook", values);
    //this.props.login(values.email, values.password);
    //this.props.history.push("/");
  }

  render() {
    if (this.props.user) {
      //  this.props.history.push("/");
    }

    const nameInputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <EmailIcon />
        </InputAdornment>
      )
    };

    const passwordInputProps = {
      startAdornment: (
        <InputAdornment position="start">
          <AccountBoxIcon />
        </InputAdornment>
      )
    };

    let fields = [
      {
        name: "name",
        label: "Name",
        type: "text",
        inputProps: passwordInputProps,
        wrapper: "w-1/2 inline-block pr-3",
        className: "bg-grey-lightx",
        helperText: "* Enter name"
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        inputProps: nameInputProps,
        wrapper: "w-1/2 inline-block",
        helperText: "* Enter email"
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        wrapper: "message",
        helperText: "* Enter message"
      }
    ];

    const Buttons = () => (
      <div>
        <p className="float-left">
          <Button variant="outlined" color="link">
            Zobrazit prispevky
          </Button>{" "}
        </p>
        <p className="float-right">
          <Button type="submit" variant="contained" color="secondary">
            Odoslat spravu
          </Button>{" "}
        </p>
      </div>
    );

    return (
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Card className="mb-4">
            <CardHeader
              classes={{ root: "bg-secondary", title: "color-white" }}
              title="Contact form"
            />
            <CardContent>

             <br/>

              {this.state.form && (
                <Form
                  fields={fields}
                  data={{}}
                  onSubmit={this.submit}
                  buttons={Buttons}
                />
              )}
              {!this.state.form && (
                <div>
                  prispevky
                  {this.props.messages.map(message => {
                    return (
                      <p style={{borderBottom: '1px dashed gray', padding: '10px'}}>
                        <Chip
                          className="float-left"
                          avatar={<Avatar>Im</Avatar>}
                          label={message.name+' - '+message.email}
                        />
                        <span className="float-right">{ message.created_at }</span>
                        <div className="clearfix"></div>
                        <div style={{}}>
                        {message.message}

                        </div>
                      </p>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    messages: state.resourceData.guestbook
  };
};

export default connect(
  mapStateToProps,
  { saveResourceData, fetchResourceData }
)(Guestbook);

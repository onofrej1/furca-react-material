import React from "react";
import { connect } from "react-redux";

const Authorization = allowedRoles => WrappedComponent => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentWillMount() {
      if (!this.props.user) {
        this.setState({ authorized: false });
      }
      const roles = this.props.user ? this.props.user.roles : [];
      const authorized = allowedRoles.every(r => {
        return roles.find(role => role.title === r) !== undefined;
      });
      this.setState({ authorized });
    }

    render() {
      if (this.state.authorized) {
        return <WrappedComponent {...this.props} />;
      } else {
        this.props.history.push("/login");
        return <div>Unauthorized</div>;
      }
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps, {})(WithAuthorization);
};
export default Authorization;

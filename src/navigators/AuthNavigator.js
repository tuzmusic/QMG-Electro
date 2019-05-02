import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginView";
import { connect } from "react-redux";
import { getUsers } from "../redux/actions/userActions";

const AuthStack = createSwitchNavigator({ Login: LoginScreen });

export class AuthNavigator extends Component {
  static router = AuthStack.router;

  async componentDidMount() {
    await this.props.getUsers()
  }

  render() {
    return <AuthStack navigation={this.props.navigation} />;
  }
}

const mapDispatchToProps = state => {
  return { users: state.users };
};

export default connect(
  mapDispatchToProps,
  { getUsers }
)(AuthNavigator);

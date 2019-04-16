import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../js/LoginView";

const AuthStack = createSwitchNavigator({ Login: LoginScreen });

export default class AuthNavigator extends Component {
  static router = AuthStack.router;
  render() {
    return <AuthStack navigation={this.props.navigation} />;
  }
}

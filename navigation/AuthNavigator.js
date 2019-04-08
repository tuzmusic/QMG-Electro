import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import LoginScreen from "../js/LoginView";

const AuthStack = createStackNavigator({ Login: LoginScreen });

export default class AuthNavigator extends Component {
  static router = AuthStack.router
  render() {
    return (
      <AuthStack navigation={this.props.navigation}/>
    );
  }
}

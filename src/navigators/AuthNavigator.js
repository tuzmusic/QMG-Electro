import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginView";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { setUser } from "../redux/actions/authActions";

const AuthStack = createSwitchNavigator({ Login: LoginScreen });

export class AuthNavigator extends Component {
  static router = AuthStack.router;

  async componentDidMount() {
    this.loginStoredUser();
  }

  async loginStoredUser() {
    const user = await AsyncStorage.getItem("electro_logged_in_user");
    if (user) {
      this.props.setUser(JSON.parse(user));
      this.props.navigation.navigate("Main");
    }
  }

  render() {
    return <AuthStack navigation={this.props.navigation} />;
  }
}

export default connect(
  null,
  { setUser }
)(AuthNavigator);

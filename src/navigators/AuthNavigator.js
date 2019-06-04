import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginView";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { setUser } from "../redux/actions/authActions";

const AuthStack = createSwitchNavigator({ Login: LoginScreen });

export class AuthNavigator extends Component {
  static router = AuthStack.router;

  async componentWillMount() {
    const user = await AsyncStorage.getItem("electro_logged_in_user");
    if (user) {
      console.log("User found in storage:", JSON.parse(user));

      this.props.setUser(JSON.parse(user));
      this.props.navigation.navigate("Main");
    }
  }

  render() {
    return <AuthStack navigation={this.props.navigation} />;
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { setUser }
)(AuthNavigator);

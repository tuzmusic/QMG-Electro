import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
import { getLocationAsync } from "../redux/actions/locationActions";

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthStack,
  Main: MainTabNavigator
});

const AppNavigator = createAppContainer(SwitchNavigator);

class AppContainer extends Component {
  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status === "granted") this.props.getLocationAsync();
  }

  render() {
    return <AppNavigator />;
  }
}

export default connect(
  null,
  { getLocationAsync }
)(AppContainer);

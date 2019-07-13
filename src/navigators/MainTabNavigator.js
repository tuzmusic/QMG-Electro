import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapView";
import StationsListScreen from "../screens/StationsListView";
import StationDetailScreen from "../screens/StationDetailView";
// import UserProfileScreen from "../screens/UserProfileView";
import UserProfileScreen from "../screens/CreateStationView";

import { fetchStations } from "../redux/actions/stationActions";
import { getLocationAsync } from "../redux/actions/locationActions";

// #region CONFIGURE STACKS
const ListStack = createStackNavigator({
  ListScreen: StationsListScreen,
  StationDetail: StationDetailScreen
});

ListStack.navigationOptions = {
  tabBarLabel: "List",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};

const MapStack = createStackNavigator({
  MapScreen: MapScreen,
  ResultsScreen: StationsListScreen,
  StationDetail: StationDetailScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={focused ? "map" : "map-o"}
      library={"FontAwesome"}
    />
  )
};

const UserStack = createStackNavigator({
  Profile: UserProfileScreen
});

UserStack.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={focused ? "user-circle" : "user-circle-o"}
      library={"FontAwesome"}
    />
  )
};

// #endregion

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ListStack
    // UserStack
  },
  {
    initialRouteName: "UserStack",
    initialRouteName: "ListStack",
    initialRouteName: "MapStack",
    butt: "butt"
  }
);

class TabContainer extends Component {
  componentWillMount() {
    this.props.getLocationAsync();
  }

  componentDidMount = async () => {
    if (!__DEV__) await this.props.fetchStations();
  };

  static router = TabNavigator.router;
  render() {
    return <TabNavigator navigation={this.props.navigation} />;
  }
}

export default connect(
  ({ main }) => ({ stations: main.stations, userLocation: main.currentRegion }),
  { fetchStations, getLocationAsync }
)(TabContainer);

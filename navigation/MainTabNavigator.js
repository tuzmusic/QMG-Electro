import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../js/MapView";
import MapResultsScreen from "../js/MapResultsView";
import StationDetailScreen from "../js/StationDetailView";
import UserDetailScreen from "../js/UserDetailView";

import { fetchStations } from "../actions/mainActions";

const ListStack = createStackNavigator({
  List: MapResultsScreen,
  StationDetail: StationDetailScreen,
  UserDetail: UserDetailScreen
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
  Maps: MapScreen,
  Results: MapResultsScreen,
  StationDetail: StationDetailScreen,
  UserDetail: UserDetailScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ListStack
  },
  {
    initialRouteName: "MapStack",
    initialRouteName: "ListStack"
  }
);

class TabContainer extends Component {
  componentDidMount = async () => {
    if (this.props.stations.length === 0) await this.props.fetchStations(true);
  };

  static router = TabNavigator.router;
  render() {
    return <TabNavigator navigation={this.props.navigation} />;
  }
}
const mapStateToProps = state => {
  return { stations: state.main.stations };
};
const mapDispatchToProps = { fetchStations };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapView";
import MapResultsScreen from "../screens/MapResultsView";
import StationDetailScreen from "../screens/StationDetailView";
import UserDetailScreen from "../screens/UserDetailView";
import CreateScreen from "../screens/CreateStationView";

import { fetchStations } from "../redux/actions/readActions";

const ListStack = createStackNavigator({
  ListScreen: MapResultsScreen,
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
  MapScreen: MapScreen,
  ResultsScreen: MapResultsScreen,
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

const CreateStationStack = createStackNavigator({
  CreateScreen: CreateScreen
});

CreateStationStack.navigationOptions = {
  tabBarLabel: "Add Station",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add-circle" : "md-add"}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ListStack,
    CreateStationStack
  },
  {
    initialRouteName: "MapStack",
    initialRouteName: "CreateStationStack",
    initialRouteName: "ListStack"
  }
);

class TabContainer extends Component {
  componentDidMount = async () => {
    // NOTE: This means we'll never update the stations after first fetch. Fine for now I guess.
    if (this.props.stations.length === 0)
      await this.props.fetchStations({ useCache: true, shouldDownload: false });
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Constants, Location, Permissions } from "expo";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapView";
import MapResultsScreen from "../screens/MapResultsView";
import StationDetailScreen from "../screens/StationDetailView";
import UserProfileScreen from "../screens/UserProfileView";
import CreateStationScreen from "../screens/CreateStationView";

import { fetchStations } from "../redux/actions/stationActions";
import { setCurrentRegion } from "../redux/actions/userActions";

// const SHOULD_DOWNLOAD = true;
const GET_CACHED = false;

// const GET_CACHED = true;
const SHOULD_DOWNLOAD = false;

// #region CONFIGURE STACKS
const ListStack = createStackNavigator({
  ListScreen: MapResultsScreen,
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
  ResultsScreen: MapResultsScreen,
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

const CreateStationStack = createStackNavigator({
  CreateScreen: CreateStationScreen
});

CreateStationStack.navigationOptions = {
  tabBarLabel: "Add Station",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? focused
            ? "md-add-circle"
            : "md-add-circle-outline"
          : "md-add"
      }
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

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ListStack,
    CreateStationStack
    // UserStack
  },
  {
    initialRouteName: "UserStack",
    initialRouteName: "ListStack",
    initialRouteName: "CreateStationStack",
    initialRouteName: "MapStack"
  }
);
// #endregion

class TabContainer extends Component {
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      return this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    }
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return console.warn("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    this.props.setCurrentRegion(location);
  };

  componentDidMount = async () => {
    await this.props.fetchStations({
      useCache: GET_CACHED,
      shouldDownload: SHOULD_DOWNLOAD
    });
  };

  static router = TabNavigator.router;
  render() {
    return <TabNavigator navigation={this.props.navigation} />;
  }
}
const mapStateToProps = state => {
  return {
    stations: state.main.stations,
    userLocation: state.main.currentRegion
  };
};
const mapDispatchToProps = { fetchStations, setCurrentRegion };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabContainer);

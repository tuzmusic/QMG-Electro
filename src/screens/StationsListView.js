// @flow

import type Station from "../models/Station";
import type { ElectroLocation } from "../../flowTypes";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import StationsListContainer from "../subviews/StationsListContainer";
import { setCurrentStationID } from "../redux/actions/stationActions";
import pluralize from "pluralize";

type ListViewProps = {
  stations: Station[],
  navigation: { navigate: (string, { title: string }) => void },
  onTextPress: (item: Station) => void,
  isLoading: boolean,
  location: ElectroLocation,
  setCurrentStationID: (number | string) => void
};

const FilterInput = (props: {}) => {
  const selectDropdown = () => {
    console.log("hello");
  };

  const radiuses: number[] = [1, 5, 15, 25];
  const dropDownOptions = radiuses.map(num => ({
    value: num,
    label: pluralize("mile", num, true)
  }));

  return (
    <View style={styles.filterContainer}>
      <Text style={{ fontSize: 17 }}>Show stations within: </Text>
      <Dropdown
        style={styles.dropDown}
        value={dropDownOptions[0].label}
        onChangeText={selectDropdown}
        data={dropDownOptions}
        containerStyle={{ width: "100%", padding: 10 }}
      />
    </View>
  );
};

class StationsListView extends Component<ListViewProps> {
  static navigationOptions = () => ({
    headerTitle: "Stations"
  });

  onStationClick = (station: Station) => {
    this.props.setCurrentStationID(station.id);
    this.props.navigation.navigate("StationDetail", { title: station.title });
  };

  render() {
    return (
      <View>
        <FilterInput />
        <StationsListContainer
          showLoading
          stations={this.props.stations.sort(closestFirst.bind(this))}
          navigation={this.props.navigation}
          onTextPress={this.onStationClick.bind(this)}
          isLoading={this.props.isLoading}
        />
      </View>
    );
  }
}

function closestFirst(a: Station, b: Station): number {
  return a.distanceFromLocation(this.props.location) >
    b.distanceFromLocation(this.props.location)
    ? 1
    : -1;
}

const mapStateToProps = state => ({
  stations: Object.values(state.main.stations),
  isLoading: state.main.isLoading,
  location: state.main.currentRegion
});

export const StationsListViewBasic = StationsListView;

export default connect(
  mapStateToProps,
  { setCurrentStationID }
)(StationsListView);

const styles = {
  dropDown: {
    width: 20
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 0.5
  }
};

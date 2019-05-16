// @flow

import type Station from "../models/Station";
import type { ElectroLocation } from "../../flowTypes";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import StationsListContainer from "../subviews/StationsListContainer";
import { setCurrentStationID } from "../redux/actions/stationActions";
import { setSearchRadius } from "../redux/actions/userActions";
import pluralize from "pluralize";

type ListViewProps = {
  stations: Station[],
  navigation: { navigate: (string, { title: string }) => void },
  onTextPress: (item: Station) => void,
  isLoading: boolean,
  location: ElectroLocation,
  searchRadius: number,
  setCurrentStationID: (number | string) => void,
  setSearchRadius: number => void
};

const FilterInput = (props: {
  onSelectDropdown: any => void,
  startingValue: number
}) => {
  const radiuses: number[] = [1, 5, 15, 25, 50, 100];
  const dropDownOptions = radiuses.map(num => ({
    value: num,
    label: pluralize("mile", num, true)
  }));

  return (
    <View style={styles.filterContainerLine1}>
      <Text style={{ fontSize: 17 }}>Show stations within: </Text>
      <View style={styles.dropDownContainer}>
        <Dropdown
          dropdownOffset={{ top: 15, left: 0 }}
          value={pluralize("miles", props.startingValue, true)}
          onChangeText={props.onSelectDropdown}
          data={dropDownOptions}
          dropdownPosition={-5.15}
          // renderBase can use default text, but then you lose the accessory.
          // Original accessory uses styles, check out the module's index.js, search for "renderAccessory() {"
        />
      </View>
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

  onSelectSearchRadius = (radius: number) => {
    this.props.setSearchRadius(radius);
  };

  render() {
    return (
      <View>
        <FilterInput
          onSelectDropdown={this.onSelectSearchRadius.bind(this)}
          startingValue={this.props.searchRadius}
        />
        <StationsListContainer
          showLoading
          stations={this.props.stations
            .filter(withinSearchRadius.bind(this))
            .sort(closestFirst.bind(this))}
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

function withinSearchRadius(station: Station): boolean {
  return (
    station.distanceFromLocation(this.props.location) <= this.props.searchRadius
  );
}

const mapStateToProps = state => ({
  stations: Object.values(state.main.stations),
  isLoading: state.main.isLoading,
  location: state.main.currentRegion,
  searchRadius: state.main.searchRadiusInMiles
});

export const StationsListViewBasic = StationsListView;

export default connect(
  mapStateToProps,
  { setCurrentStationID, setSearchRadius }
)(StationsListView);

const styles = {
  dropDownContainer: {
    width: "30%",
    paddingLeft: 5
  },
  filterContainerLine1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
};

// @flow

import type Station from "../models/Station";
import type { ElectroLocation } from "../../flowTypes";
import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import StationsListContainer from "../subviews/StationsListContainer";
import { setCurrentStationID } from "../redux/actions/stationActions";
import { setSearchRadius } from "../redux/actions/locationActions";
import pluralize from "pluralize";
import FilterInput from "../subviews/FilterInput";

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
      <ScrollView>
        <FilterInput
          onSelectDropdown={this.onSelectSearchRadius.bind(this)}
          startingValue={this.props.searchRadius}
        />
        <StationsListContainer
          stations={this.props.stations
            .filter(withinSearchRadius.bind(this))
            .sort(closestFirst.bind(this))}
          navigation={this.props.navigation}
          onTextPress={this.onStationClick.bind(this)}
          isLoading={this.props.isLoading}
        />
      </ScrollView>
    );
  }
}

function closestFirst(a: Station, b: Station): number {
  if (!a.location || !b.location) return 0;
  const distA = a.distanceFromLocation(this.props.location);
  const distB = b.distanceFromLocation(this.props.location);
  if (!distA || !distB) return 0;
  return distA > distB ? 1 : -1;
}

function withinSearchRadius(station: Station): boolean {
  const dist = station.distanceFromLocation(this.props.location);
  if (dist) {
    const bool = dist <= this.props.searchRadius;
    return bool;
  } else if (this.props.searchRadius === 1e100) {
    return true;
  }
  return false;
}

const mapStateToProps = ({ main, location }) => ({
  stations: Object.values(main.stations),
  isLoading: main.isLoading,
  location: main.currentRegion,
  searchRadius: location.searchRadiusInMiles
});

export const StationsListViewBasic = StationsListView;

export default connect(
  mapStateToProps,
  { setCurrentStationID, setSearchRadius }
)(StationsListView);

const styles = {};

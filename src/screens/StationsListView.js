// @flow

import type Station from "../models/Station";
import type { ElectroLocation } from "../../flowTypes";
import React, { Component } from "react";
import { connect } from "react-redux";
import StationsListContainer from "../subviews/StationsListContainer";
import { setCurrentStationID } from "../redux/actions/stationActions";

type Props = {
  stations: Station[],
  navigation: { navigate: (string, { title: string }) => void },
  onTextPress: (item: Station) => void,
  location: ElectroLocation,
  setCurrentStationID: (number | string) => void,
  isLoading: boolean
};

class StationsListView extends Component<Props> {
  static navigationOptions = () => ({
    headerTitle: "Stations"
  });

  onStationClick = (station: Station) => {
    this.props.setCurrentStationID(station.id);
    this.props.navigation.navigate("StationDetail", { title: station.title });
  };

  render() {
    return (
      <StationsListContainer
        showLoading
        stations={this.props.stations}
        navigation={this.props.navigation}
        onTextPress={this.onStationClick.bind(this)}
        isLoading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  stations: state.main.stations,
  isLoading: state.main.isLoading,
  user: state.auth.user
});

export const StationsListViewBasic = StationsListView;

export default connect(
  mapStateToProps,
  { setCurrentStationID }
)(StationsListView);

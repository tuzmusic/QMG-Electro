import React, { Component } from "react";
import { connect } from "react-redux";
import StationsList from "./StationsList";
import { setCurrentStation, setUserInQuestion } from "../actions/mainActions";

class MapResultsContainer extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  onStationClick = station => {
    this.props.setCurrentStation(station);
    this.props.navigation.navigate("StationDetail", { title: station.name });
  };

  onUserClick = user => {
    this.props.setUserInQuestion(user);
    this.props.navigation.navigate("UserDetail", { title: user.username });
  };

  render() {
    return (
      <StationsList
        stations={this.props.stations}
        navigation={this.props.navigation}
        onTextPress={this.onStationClick.bind(this)}
        onImagePress={this.onUserClick.bind(this)}
        isLoading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  stations: state.main.stations,
  isLoading: state.main.isLoading
});

export const MapResultsViewBasic = MapResultsContainer;

export default connect(
  mapStateToProps,
  { setCurrentStation, setUserInQuestion }
)(MapResultsContainer);


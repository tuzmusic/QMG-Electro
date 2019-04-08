import React, { Component } from "react";
import { FlatList } from "react-native";
import StationCellView from "./StationCellView";
import { connect } from "react-redux";
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
      />
    );
  }
}

const mapStateToProps = state => ({
  stations: state.main.stations
});

export default connect(
  mapStateToProps,
  { setCurrentStation, setUserInQuestion }
)(MapResultsContainer);

const StationsList = props => (
  <FlatList
    style={{ marginLeft: 5, marginRight: 5 }}
    data={props.stations}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <StationCellView
        station={item}
        navigation={props.navigation}
        onTextPress={props.onTextPress.bind(this, item)}
        onImagePress={props.onImagePress.bind(this, item.owner)}
      />
    )}
  />
);

export const MapResultsViewBasic = MapResultsContainer;

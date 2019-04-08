import React, { Component } from "react";
import { FlatList } from "react-native";
import StationCellView from "./StationCellView";
import { connect } from "react-redux";

class MapResultsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.getParam("searchText")
    title: "Nearby Stations"
  });

  onStationClick = station => {
    console.log("onStationClick defined in MapResultsView");

    this.props.navigation.navigate("StationDetail", {
      station: station
    });
  };

  onUserClick = user => {
    console.log("onUserClick defined in MapResultsView");
    this.props.navigation.navigate("UserDetail", {
      user: user
    });
  }

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

export default connect(mapStateToProps)(MapResultsContainer);

const StationsList = props => (
  <FlatList
    style={{ marginLeft: 5, marginRight: 5 }}
    data={props.stations}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <StationCellView
        station={item}
        navigation={props.navigation}
        onTextPress={props.onTextPress}
      />
    )}
  />
);

export const MapResultsViewBasic = MapResultsContainer;

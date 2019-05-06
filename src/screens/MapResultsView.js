import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-native";
import StationsList from "../subviews/StationsList";
import StationsListContainer from "../subviews/StationsListContainer";
import {
  setCurrentStationID,
  setUserInQuestion,
  fetchStations
} from "../redux/actions/stationActions";

class MapResultsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("title")
    /* headerLeft: (
      <Button
        title="Download"
        onPress={navigation.getParam("download") || (() => {})}
      />
    ),
    headerRight: (
      <Button
        title="Get Cached"
        onPress={navigation.getParam("getCached") || (() => {})}
      />
    ) */
  });

  goToStation(id) {
    setTimeout(() => {
      this.onStationClick(this.props.stations[id]);
    }, 1000);
  }

  componentDidMount() {
    this.setNavigationProps()
  }

  setNavigationProps() {
    this.props.navigation.setParams({
      title: `Stations`
    });
    /* this.props.navigation.setParams({
      download: async () => await this.props.fetchStations(false)
    });
    this.props.navigation.setParams({
      getCached: async () => await this.props.fetchStations(true, 2)
    }); */
  }

  onStationClick = station => {
    this.props.setCurrentStationID(station.id);
    this.props.navigation.navigate("StationDetail", { title: station.title });
  };

  onUserClick = user => {
    this.props.setUserInQuestion(user);
    this.props.navigation.navigate("UserDetail", { title: user.username });
  };

  render() {
    return (
      <StationsListContainer
        stations={Object.values(this.props.stations)}
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
  isLoading: state.main.isLoading,
  user: state.auth.user
});

export const MapResultsViewBasic = MapResultsContainer;

export default connect(
  mapStateToProps,
  { setCurrentStationID, setUserInQuestion, fetchStations }
)(MapResultsContainer);

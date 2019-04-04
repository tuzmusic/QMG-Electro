import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";
import { fetchStations } from "../actions/mainActions";

import StationCellView from "./StationCellView";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  state = {
    region: { // Center on 88 N Spring St Concord NH
      latitude: 43.208552,
      longitude: -71.542526,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421
    }
  };

  calculateRegion(latitude, longitude, accuracy) {
    const oneDegreeOfLongitudeInMeters = 111.32;
    const circumference = 40075 / 360;
    const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
    const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
    const region = { latitude, longitude, latitudeDelta, longitudeDelta };
    this.setState({ region });
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;
      this.calculateRegion(latitude, longitude, accuracy);
    });
  };

  componentDidMount = () => {
    this.props.fetchStations();
  };

  renderMarkers() {
    return this.props.stations.map(station => {
      const logo = require("../assets/logos/BOLTIcon.jpg");
      return (
        <Marker
          coordinate={{
            latitude: station.location.lat,
            longitude: station.location.lng
          }}
          key={
            station.location.lat.toString() + station.location.lng.toString()
          }
        >
          <Callout>
            <StationCellView
              station={station}
              // onPress={() =>
              //   this.props.navigation.navigate("StationDetail", { station })
              // }
            />
          </Callout>
        </Marker>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          showsUserLocation={true}
        >
          {this.renderMarkers()}
        </MapView>
      </View>
    );
  }
}

const mapDispatchToProps = state => ({
  stations: state.main.stations
});

export default connect(
  mapDispatchToProps,
  { fetchStations }
)(MapScreen);

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
});

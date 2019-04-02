import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, TextInput } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import GoogleAPIKey from "../secrets";
import Geocoder from "react-native-geocoding";
import { connect } from "react-redux";

import StationCellView from "./StationCellView";
import StationsMock from "../tests/mocks/StationsMock";

const concordRegion = {
  latitude: 43.208552,
  longitude: -71.542526,
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421
};

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  state = {
    region: concordRegion,
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

export default connect(mapDispatchToProps)(MapScreen);

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonCallout: {
    flex: 1,
    // alignSelf: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 0.4,
    borderColor: "grey",
    ios: { padding: 5 },
    borderRadius: 20,
    right: 10,
    bottom: 10
  },
  touchable: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 15
  },
  touchableText: {
    fontSize: 24,
    color: "blue"
  },
  calloutsContainer: {
    // flex: 1,
    // flexDirection: 'row',
    backgroundColor: "blue"
  },
  infoText: {
    marginTop: "5%",
    marginLeft: "5%",
    fontSize: 15,
    color: "darkgrey"
  },
  infoCallout: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 20,
    height: 2,
    marginLeft: "15%",
    marginTop: "90%"
  },
  button: {
    flex: 1
  },
});

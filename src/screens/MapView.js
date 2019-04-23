import React, { Component } from "react";
import { MapView } from "expo";
import { View, Text } from "react-native";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
const { Marker } = MapView;

import ListingCellView from "../subviews/ListingCellView";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  state = {
    region: {
      // Center on 88 N Spring St Concord NH
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

  renderMarkers() {
    const markers = Object.keys(this.props.stations).map(key => {
      const station = this.props.stations[key];
      const marker = (
        <Marker
          coordinate={{
            latitude: Number(station.location.lat),
            longitude: Number(station.location.lng)
          }}
          key={key}
        />
      );
      return marker;
    });
    return markers
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={this.state.region}
          showsUserLocation={true}
        >
          {this.renderMarkers()}
          {/* <Marker coordinate={this.state.region} /> */}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stations: state.main.stations
});

export default connect(mapStateToProps)(MapScreen);

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

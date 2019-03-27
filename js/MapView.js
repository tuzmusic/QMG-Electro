import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";

export default class MapScreen extends Component {
  state = {
    region: {
      latitude: 43.208552,
      longitude: -71.542526,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    markers: []
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
        showsUserLocation={true}
      >
        {this.state.markers.map(marker => (
          <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }
}

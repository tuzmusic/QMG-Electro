import React, { Component } from "react";
import MapView from "react-native-maps";

export default class MapScreen extends Component {
  state = this.getInitialState()
  
  getInitialState() {
    return {
      region: {
        latitude: 43.208552,
        longitude: -71.542526,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange(region) {
    this.setState({region})
  } 

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
        showsUserLocation={true}
      />
    );
  }
}

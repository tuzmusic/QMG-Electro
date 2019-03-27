import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, TextInput } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

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
      <View style={styles.container}>
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
        <Callout>
          <View style={styles.calloutView}>
            <TextInput style={styles.calloutSearch} placeholder={"Search"} />
          </View>
        </Callout>
      </View>
    );
  }
}

const styles = F8StyleSheet.create({
  container: { flex: 1 },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "80%",
    marginLeft: "5%",
    marginTop: 40
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  },
});

import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { Platform, View, TextInput, Text, Button } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

export default class MapScreen extends Component {
  concord = {
    name: "Concord",
    latitude: 43.208552,
    longitude: -71.542526,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  dc = {
    name: "DC",
    latitude: 38.909354,
    longitude: -77.01586,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  state = {
    region: this.concord,
    currentRegion: "Concord",
    markers: [],
    message: "Currently in Concord"
  };

  getHereMessage() {
    // if region has been changed at all by a tap or anything, it no longer has a name!
    // so we NEED currentRegion
    this.setState({ message: "Currently in " + this.state.currentRegion });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onMapPress() {
    this.setState({ message: "You pressed somewhere." });
    setTimeout(this.getHereMessage.bind(this), 1000);
  }

  onButtonPress() {
    let newRegion = this.state.currentRegion === "DC" ? this.concord : this.dc;
    this.setState(
      { region: newRegion, currentRegion: newRegion.name },
      this.getHereMessage
    );
  }

  renderMarkers() {
    this.state.markers.map(marker => (
      <Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onMapPress.bind(this)}
          showsUserLocation={true}
        >
          {this.renderMarkers()}
        </MapView>
        <Callout style={styles.searchCallout}>
          <TextInput style={styles.calloutSearch} placeholder={"Search"} />
        </Callout>
        <Callout style={styles.infoCallout}>
          <Text style={styles.infoText}>
            longitude: {this.state.region.longitude}
          </Text>
          <Text style={styles.infoText}>
            latitude: {this.state.region.latitude}
          </Text>
          <Text style={styles.infoText}>{this.state.message}</Text>
        </Callout>
        <Callout style={styles.buttonCallout}>
          <Button
            color={Platform.OS === "ios" ? "black" : null}
            title={
              "Go to " +
              (this.state.currentRegion === "Concord" ? "DC" : "Concord")
            }
            onPress={this.onButtonPress.bind(this)}
          />
        </Callout>
      </View>
    );
  }
}

const styles = F8StyleSheet.create({
  container: { flex: 1 },
  calloutsContainer: {
    flex: 1,
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
  buttonCallout: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    ios: { padding: 5 },
    borderRadius: 20,
    right: 20,
    bottom: 20
  },
  searchCallout: {
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
  }
});

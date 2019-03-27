import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, TextInput, Text } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

export default class MapScreen extends Component {
  state = {
    region: {
      latitude: 43.208552,
      longitude: -71.542526,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    markers: [],
    message: "Placeholder info text"
  };

  onRegionChange(region) {
    this.setState({ region });
  }

  onPress() {
    this.setState({ message: "You pressed somewhere." });
    setTimeout(() => {
      this.setState({message: "Press somewhere else, maybe."})
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          onPress={this.onPress.bind(this)}
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
      </View>
    );
  }
}

const styles = F8StyleSheet.create({
  container: { flex: 1 },
  infoText: {
    marginTop: "5%",
    marginLeft: "5%",
    fontSize: 15,
    color: "darkgrey"
  },
  infoCallout: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 20,
    width: "70%",
    height: "30%",
    marginLeft: "15%",
    marginTop: "90%"
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

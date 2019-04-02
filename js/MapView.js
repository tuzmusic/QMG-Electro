import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  Platform,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity
} from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import GoogleAPIKey from "../secrets";
import Geocoder from "react-native-geocoding";

let concord = {
  name: "Concord",
  title: "Our house in Concord",
  address: "88 North Spring Street, 03301",
  latitude: 43.208552,
  longitude: -71.542526,
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421
};

let dc = {
  name: "DC",
  title: "Our house in DC",
  address: "1427 New Jersey Ave NW, 20001",
  latitude: 38.909354,
  longitude: -77.01586,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

Geocoder.init(GoogleAPIKey);

export default class MapScreen extends Component {
  state = {
    region: concord,
    currentRegion: "Concord",
    places: [dc, concord],
    markers: [],
    message: "Currently in Concord",
    searchText: "1427 nj ave nw 20001"
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
    // this.state.places.forEach(place => this.dropMarkerFromAddress(place.address));
  };

  dropMarkerFromAddress(address) {
    Geocoder.from(address)
      .then(json => {
        const coordinates = {
          latitude: json.results[0].geometry.location.lat,
          longitude: json.results[0].geometry.location.lng
        };
        const marker = {
          latlng: coordinates,
          title: address.title,
          pinColor: "green"
        };
        this.setState({ markers: [marker], region: coordinates });
      })
      .catch(error => console.warn(error));
  }

  renderMarkers() {
    return this.state.markers.map(marker => (
      <Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
        pinColor={marker.pinColor}
        key={
          marker.latlng.latitude.toString() + marker.latlng.longitude.toString()
        }
      />
    ));
  }

  handleSearch() {
    this.dropMarkerFromAddress(this.state.searchText);
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
        {/* <Callout > */}
        <Callout style={styles.searchCallout}>
          <TextInput
            onChangeText={searchText => this.setState({ searchText })}
            onSubmitEditing={this.handleSearch.bind(this)}
            style={styles.calloutSearch}
            placeholder={"Search"}
            value={this.state.searchText}
          />
        </Callout>
        <Callout style={styles.buttonCallout}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={[styles.touchable]}
            onPress={() => console.log("press")}
          >
            <Text style={styles.touchableText}>Press Me 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            style={[styles.touchable]}
            onPress={() => console.log("press")}
          >
            <Text style={styles.touchableText}>Press Me 2</Text>
          </TouchableOpacity>
        </Callout>
        {/* </Callout> */}
      </View>
    );
  }
}

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
    borderColor: 'grey',
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
  searchCallout: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: "90%",
    top: 30
  },
  calloutSearch: {
    // width: "90%",
    marginLeft: 10,
    marginRight: 10,
    height: 40
  }
});

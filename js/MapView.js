import React, { Component } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { Platform, View, TextInput, Text, Button } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import GoogleAPIKey from "../secrets";
import Geocoder from "react-native-geocoding";
import StationsMock from "../tests/mocks/StationsMock";

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
    searchText: ""
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

  async dropMarker(address) {
    let json;
    try {
      json = await Geocoder.from(address);
    } catch (error) {
      console.warn(error);
      return;
    }

    const coordinates = {
      latitude: json.results[0].geometry.location.lat,
      longitude: json.results[0].geometry.location.lng
    };
    const marker = {
      latlng: coordinates,
      title: address.title,
      pinColor: "green"
    };
    this.setState({
      markers: [marker],
      region: { ...this.state.region, ...coordinates }
    });
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

  componentDidMount = () => {
    return
    // this.setState({ searchText: "starbucks" }, this.handleSearch);
    this.props.navigation.navigate("Results", {
      searchText: "Stations Near Me",
      results: StationsMock.stations
    });
  };

  fetchSearch() {
    const searchText = this.state.searchText.split(" ").join("%20");

    let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchText}&inputtype=textquery&fields=formatted_address,name,geometry&key=${GoogleAPIKey}`;

    // url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${GoogleAPIKey}`;
    console.log(url);

    fetch(url)
      .then(res => JSON.parse(res._bodyText))
      .then(json => {
        const results = json.candidates;
        this.props.navigation.navigate("Results", { results });
      })
      .catch(err => console.log(err));
  }

  async handleSearch() {
    // this.dropMarker(this.state.searchText); return;
    // this.fetchSearch(); return;

    try {
      const json = await Geocoder.from(this.state.searchText);
      this.props.navigation.navigate("Results", { results: json.results });
    } catch (error) {
      console.warn(error);
    }
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
        <Callout style={styles.searchCallout}>
          <TextInput
            onChangeText={searchText => this.setState({ searchText })}
            onSubmitEditing={this.handleSearch.bind(this)}
            style={styles.calloutSearch}
            placeholder={"Search"}
            value={this.state.searchText}
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
  button: {
    flex: 1
  },
  buttonCallout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    backgroundColor: "transparent",
    ios: { padding: 5 },
    borderRadius: 20,
    right: "10%",
    bottom: 80
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

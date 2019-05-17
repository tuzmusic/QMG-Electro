import React, { Component } from "react";
import { MapView } from "expo";
import { View, Button, Text, Platform, TextInput } from "react-native";
import { BLText } from "../components/StyledComponents";
import TabBarIcon from "../components/TabBarIcon";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
import {
  getLocationAsync,
  setCurrentRegion
} from "../redux/actions/userActions";
import { setCurrentStationID } from "../redux/actions/stationActions";
import ListingCellView from "../subviews/ListingCellView";
import AutoFillMapSearch from "../subviews/AutoFillMapSearch";

const { Marker, Callout } = MapView;

const FindMeButton = ({ onPress }) => {
  return (
    <Callout style={styles.locationButtonCallout}>
      <Button onPress={onPress} title={"Find Me"} style={styles.locationButton}>
        {/* <TabBarIcon name={"location-arrow"} library={"FontAwesome"} /> */}
      </Button>
    </Callout>
  );
};

function automate() {
  const stations = require("../../tests/__mocks__/old/StationsMock").stations;
  const station = stations[0];
  debugger;
  this.props.setCurrentRegion({
    latitude: station.location.latitude,
    longitude: station.location.longitude,
    accuracy: 0.01,
    showMarker: true
  });
}

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  componentDidMount = () => {
    // setTimeout(automate.bind(this), 2000);
  };

  stationMarkers() {
    const stations = this.props.stations;
    return (markers = Object.keys(stations).map(key => {
      const station = this.props.stations[key];
      return (marker = (
        <Marker
          key={key}
          // onPress={this.onMarkerPress.bind(this, station)}
          coordinate={{
            latitude: Number(station.location.latitude),
            longitude: Number(station.location.longitude)
          }}
        >
          <Callout
            onPress={() => {
              this.props.setCurrentStationID(station.id);
              this.props.navigation.navigate("ListScreen");
              this.props.navigation.navigate("StationDetail", {
                title: station.title
              });
            }}
          >
            <ListingCellView
              station={station}
              containerStyle={{ width: 350 }}
            />
          </Callout>
        </Marker>
      ));
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={this.props.currentRegion}
          showsUserLocation={true}
        >
          {this.stationMarkers()}
          {this.props.currentRegion && this.props.currentRegion.showMarker && (
            <Marker coordinate={this.props.currentRegion} pinColor={"green"} />
          )}
        </MapView>
        <Callout style={styles.searchCallout}>
          <AutoFillMapSearch style={styles.calloutSearch} />
        </Callout>
        <FindMeButton onPress={this.props.getLocationAsync} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.main.stations,
    currentRegion: state.main.currentRegion
  };
};

export default connect(
  mapStateToProps,
  { getLocationAsync, setCurrentRegion, setCurrentStationID }
)(MapScreen);

const styles = F8StyleSheet.create({
  searchCallout: {
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 10,
    top: 20,
    left: 15,
    right: 15
  },
  calloutSearch: {
    marginLeft: 10,
    marginRight: 10,
    height: 40
  },
  locationButtonCallout: {
    borderRadius: 10,
    opacity: 0.7,
    backgroundColor: "lightgrey",
    bottom: 0,
    right: 0,
    margin: 10
  },
  locationButton: {
    backgroundColor: "grey",
    borderRadius: 10,
    opacity: 0.8
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});

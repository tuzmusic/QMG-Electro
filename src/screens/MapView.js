import React, { Component } from "react";
import { View, Platform, TextInput, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import {
  getLocationAsync,
  setCurrentRegion
} from "../redux/actions/locationActions";
import { setCurrentStationID } from "../redux/actions/stationActions";
import AutoFillMapSearch from "../subviews/AutoFillMapSearch";
import StationMarkers from "../subviews/StationMarkers";
import LoadingIndicator from "../components/LoadingIndicator";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker, Callout } from "react-native-maps";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  state = { region: null };

  goToCupertino = () =>
    this.props.setCurrentRegion({
      latitude: 37.33233141,
      longitude: -122.0312186,
      accuracy: 0.05,
      showMarker: true
    });

  onMarkerPress = station => {
    this.setState({
      region: { ...this.props.currentRegion, ...station.location }
    });
  };

  onCalloutPress = station => {
    this.props.setCurrentStationID(station.id);
    this.props.navigation.navigate("StationDetail", {
      title: station.title
    });
  };

  beforePressPrediction = async () => {
    await this.setState({ region: null });
  };

  render() {
    console.log("MapView", this.props.currentRegion);

    return (
      <View style={styles.container}>
        <LoadingIndicator
          message={"Loading Stations..."}
          isVisible={this.props.isLoading}
        />
        <MapView
          // provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={this.props.currentRegion}
          showsUserLocation={true}
        >
          <StationMarkers
            stations={this.props.stations}
            onCalloutPress={this.onCalloutPress.bind(this)}
          />
          <CurrentRegionMarker currentRegion={this.props.currentRegion} />
        </MapView>
        <Callout style={styles.searchCallout}>
          <AutoFillMapSearch
            style={styles.calloutSearch}
            beforeOnPress={this.beforePressPrediction.bind(this)}
          />
        </Callout>
        {__DEV__ && <CupertinoButton onPress={this.goToCupertino.bind(this)} />}
        <LocationButton onPress={this.props.getLocationAsync} />
      </View>
    );
  }
}

const LocationButton = ({ onPress }) => {
  return (
    // callout can't have borderRadius in android
    <Callout style={styles.locationButtonCallout}>
      <Button
        buttonStyle={styles.locationButton}
        onPress={onPress}
        icon={<Icon name="location-arrow" color="#3B6EC2" size={20} />}
      />
    </Callout>
  );
};

const CurrentRegionMarker = ({ currentRegion }) => {
  return currentRegion && currentRegion.showMarker ? (
    <Marker coordinate={currentRegion} pinColor={"green"} />
  ) : null;
};

const CupertinoButton = props => (
  <Callout style={[styles.locationButtonCallout, { right: 60, width: null }]}>
    <Button onPress={props.onPress} title={"Cupertino"} />
  </Callout>
);

const mapStateToProps = ({ main, location }) => ({
  stations: main.stations,
  currentRegion: location.currentRegion,
  isLoading: main.isLoading
});

export default connect(
  mapStateToProps,
  { getLocationAsync, setCurrentRegion, setCurrentStationID }
)(MapScreen);
// const buttonSize = Dimensions.get("window").height * 0.15;
const buttonSize = 40;
const styles = {
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
    opacity: 0.9,
    backgroundColor: "transparent",
    bottom: 0,
    right: 0,
    height: buttonSize,
    width: buttonSize,
    margin: 15
  },
  locationButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
};

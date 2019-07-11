import React, { Component } from "react";
import {
  View,
  Button as NativeButton,
  Text,
  Platform,
  TextInput
} from "react-native";
import { Button } from "react-native-elements";
import { BLText } from "../components/StyledComponents";
import TabBarIcon from "../components/TabBarIcon";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
import {
  getLocationAsync,
  setCurrentRegion
} from "../redux/actions/locationActions";
import { setCurrentStationID } from "../redux/actions/stationActions";
import AutoFillMapSearch from "../subviews/AutoFillMapSearch";
import StationMarkers from "../subviews/StationMarkers1";
import LoadingIndicator from "../components/LoadingIndicator";
import Icon from "react-native-vector-icons/FontAwesome";

import MapView, { Marker, Callout } from "react-native-maps";

const LocationButton = ({ onPress }) => {
  return (
    <Callout style={styles.locationButtonCallout}>
      <Button
        buttonStyle={styles.locationButton}
        onPress={onPress}
        icon={<Icon name="location-arrow" color="#3B6EC2" size={22} />}
      />
    </Callout>
  );
};
const Locations = {
  cupertino: {
    latitude: 37.33233141,
    longitude: -122.0312186,
    accuracy: 0.05
  }
};

function automate() {
  const stations = require("../../tests/__mocks__/old/StationsMock").stations;
  const station = stations[0];
  this.props.setCurrentRegion(Locations.cupertino);
}

const CurrentRegionMarker = ({ currentRegion }) => {
  return currentRegion && currentRegion.showMarker ? (
    <Marker coordinate={currentRegion} pinColor={"green"} />
  ) : null;
};

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  componentDidMount = () => {
    // setTimeout(automate.bind(this), 2000);
  };

  state = { region: null };

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
    console.log("beforePressPrediction");
    await this.setState({ region: null });
  };
  render() {
    return (
      <View style={styles.container}>
        <LoadingIndicator
          message={"Loading Stations..."}
          isVisible={this.props.isLoading}
        />
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={this.props.currentRegion}
          showsUserLocation={true}
        >
          <StationMarkers
            stations={this.props.stations}
            onCalloutPress={this.onCalloutPress.bind(this)}
            onMarkerPress={() => {}}
            // onMarkerPress={this.onMarkerPress.bind(this)}
          />
          <CurrentRegionMarker currentRegion={this.props.currentRegion} />
        </MapView>
        <Callout style={styles.searchCallout}>
          <AutoFillMapSearch
            style={styles.calloutSearch}
            beforeOnPress={this.beforePressPrediction.bind(this)}
          />
        </Callout>
        {__DEV__ && (
          <Callout style={[styles.locationButtonCallout, { right: 100 }]}>
            <NativeButton
              onPress={() =>
                this.props.setCurrentRegion({
                  ...Locations.cupertino,
                  showMarker: true
                })
              }
              title={"Cupertino"}
              style={styles.locationButton}
            />
          </Callout>
        )}
        <LocationButton
          onPress={() => {
            // this.setState({ region: null });
            this.props.getLocationAsync();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.main.stations,
    currentRegion: state.main.currentRegion,
    isLoading: state.main.isLoading
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
    borderRadius: 50,
    opacity: 0.9,
    backgroundColor: "white",
    bottom: 0,
    right: 0,
    margin: 15,
    padding: 10
  },
  locationButton: {
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});

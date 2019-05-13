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
  // debugger;
  this.props.setCurrentRegion({
    coords: {
      latitude: station.location.lat,
      longitude: station.location.lng,
      accuracy: 0.02
    }
  });
}

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  componentDidMount = () => {
    setTimeout(automate.bind(this), 1000);
  };

  renderMarkers() {
    return (markers = Object.keys(this.props.stations).map(key => {
      const station = this.props.stations[key];
      return (marker = (
        <Marker
          key={key}
          // onPress={this.onMarkerPress.bind(this, station)}
          coordinate={{
            latitude: Number(station.location.lat),
            longitude: Number(station.location.lng)
          }}
        >
          <Callout
            onPress={() => {
              this.props.navigation.navigate("ListScreen");
              // this.props.navigation.navigate("StationDetail", {
              //   title: station.title
              // });
            }}
          >
            <BLText>{station.title}</BLText>
          </Callout>
        </Marker>
      ));
    }));
  }

  currentRegionEqualsCurrentLocation() {
    if (!this.props.currentRegion || !this.props.currentUserLocation)
      return true;
    return (
      this.props.currentRegion.longitude ===
        this.props.currentUserLocation.longitude &&
      this.props.currentRegion.latitude ===
        this.props.currentUserLocation.latitude
    );
  }

  render() {
    // console.log(
    //   "rendering at region:",
    //   JSON.stringify(this.props.currentRegion)
    // );

    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={this.props.currentRegion}
          showsUserLocation={true}
        >
          {this.renderMarkers()}
          {!this.currentRegionEqualsCurrentLocation() && (
            <Marker coordinate={this.props.currentRegion} pinColor={"green"} />
          )}
        </MapView>
        <Callout style={styles.searchCallout}>
          <AutoFillMapSearch
            style={styles.calloutSearch}
            // onSubmitEditing={this.handleSearch.bind(this)}
          />
        </Callout>
        <FindMeButton onPress={this.props.getLocationAsync} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.main.stations,
    currentRegion: state.main.currentRegion,
    currentUserLocation: state.main.currentUserLocation
  };
};

export default connect(
  mapStateToProps,
  { getLocationAsync, setCurrentRegion }
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

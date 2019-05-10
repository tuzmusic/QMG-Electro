import React, { Component } from "react";
import { MapView } from "expo";
import { View, Button, Text, Platform } from "react-native";
import { BLText } from "../components/StyledComponents";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
const { Marker, Callout } = MapView;
import { getLocationAsync } from "../redux/actions/userActions";
import ListingCellView from "../subviews/ListingCellView";

FindMeButton = ({ onPress }) => {
  return (
    <View style={styles.locationButtonCallout}>
      <Button
        onPress={() => {
          console.log("Pressed");
          onPress();
        }}
        title={"Find Me"}
        style={styles.locationButton}
      />
    </View>
  );
};

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
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

  render() {
    console.log("rendering at region:", this.props.userLocation);

    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={this.props.userLocation}
          showsUserLocation={true}
        >
          {this.renderMarkers()}
          <FindMeButton onPress={this.props.getLocationAsync} />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stations: state.main.stations,
    userLocation: state.main.currentRegion
  };
};

export default connect(
  mapStateToProps,
  { getLocationAsync }
)(MapScreen);

const styles = F8StyleSheet.create({
  locationButtonCallout: {
    borderRadius: 10,
    opacity: 0.8,
    backgroundColor: "lightgrey"
  },
  locationButton: {
    backgroundColor: "grey",
    borderRadius: 10,
    opacity: 0.8
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

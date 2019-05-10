import React, { Component } from "react";
import { MapView } from "expo";
import { View, Button, Text, Platform, TextInput } from "react-native";
import { BLText } from "../components/StyledComponents";
import TabBarIcon from "../components/TabBarIcon";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
const { Marker, Callout } = MapView;
import { getLocationAsync } from "../redux/actions/userActions";
import ListingCellView from "../subviews/ListingCellView";

const FindMeButton = ({ onPress }) => {
  return (
    <Callout style={styles.locationButtonCallout}>
      <Button onPress={onPress} title={"Find Me"} style={styles.locationButton}>
        {/* <TabBarIcon name={"location-arrow"} library={"FontAwesome"} /> */}
      </Button>
    </Callout>
  );
};

const SearchBar = props => {
  return (
    <Callout style={styles.searchCallout}>
      <TextInput
        // onChangeText={searchText => this.setState({ searchText })}
        // onSubmitEditing={this.handleSearch.bind(this)}
        style={styles.calloutSearch}
        placeholder={"Search"}
        value={props.value}
      />
    </Callout>
  );
};

class MapScreen extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  state = {
    searchText: ""
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
        </MapView>
        <SearchBar
          // onChangeText={searchText => this.setState({ searchText })}
          value={this.state.searchText}
        />
        <FindMeButton onPress={this.props.getLocationAsync} />
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
    justifyContent: "center",
  }
});

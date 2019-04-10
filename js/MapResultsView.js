import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import ListingCellView from "./ListingCellView";
import LoadingIndicator from "../components/LoadingIndicator";
import { connect } from "react-redux";
import { setCurrentStation, setUserInQuestion } from "../actions/mainActions";

class MapResultsContainer extends Component {
  static navigationOptions = {
    title: "Nearby Stations"
  };

  onStationClick = station => {
    this.props.setCurrentStation(station);
    this.props.navigation.navigate("StationDetail", { title: station.name });
  };

  onUserClick = user => {
    this.props.setUserInQuestion(user);
    this.props.navigation.navigate("UserDetail", { title: user.username });
  };

  render() {
    return (
      <View>
        {/* <LoadingIndicator
          message={"Loading Stations..."}
          isVisible={this.props.isLoading}
        /> */}
        <StationsList
          stations={this.props.stations}
          navigation={this.props.navigation}
          onTextPress={this.onStationClick.bind(this)}
          onImagePress={this.onUserClick.bind(this)}
          isLoading={this.props.isLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stations: state.main.stations,
  isLoading: state.main.isLoading
});

export default connect(
  mapStateToProps,
  { setCurrentStation, setUserInQuestion }
)(MapResultsContainer);

const StationsList = props => (
  <View>
    {/*     <Overlay
      containerStyle={styles.modal}
      height={200}
      width={200}
      isVisible={props.isLoading}
      style={styles.modal}
      borderRadius={20}
      overlayBackgroundColor={"lightblue"}
    >
      <View style={styles.modalContainer}>
        <DotIndicator color={"darkgrey"} />
        <Text>{"Loading..."}</Text>
      </View>
    </Overlay> */}

    <LoadingIndicator
      message={"Loading Stations..."}
      isVisible={props.isLoading}
    />

    <FlatList
      style={{ marginLeft: 5, marginRight: 5 }}
      data={props.stations}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListingCellView
          station={item}
          navigation={props.navigation}
          onTextPress={props.onTextPress.bind(this, item)}
          onImagePress={props.onImagePress.bind(this, item.owner)}
        />
      )}
    />
  </View>
);

export const MapResultsViewBasic = MapResultsContainer;

import React, { Component } from "react";
import { FlatList } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import StationCellView from "./StationCellView";
import StationsMock from "../tests/mocks/StationsMock";
import { connect } from "react-redux";

class MapResultsView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("searchText")
  });

  constructor(props) {
    super(props);
    this.results = this.props.navigation.state.params?.results || StationsMock.stations
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <StationCellView station={item} navigation={this.props.navigation} />
  );

  render() {
    return (
      <FlatList
        style={{ marginLeft: 5, marginRight: 5 }}
        // data={this.results}
        data={this.props.stations}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapDispatchToProps = state => ({
  stations: state.main.stations
});

export default connect(mapDispatchToProps)(MapResultsView);

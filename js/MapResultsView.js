import React, { Component } from "react";
import { View, Text, Touchable, FlatList, Image } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import StationCellView from "./StationCellView";

export default class MapResultsView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("searchText")
  });

  constructor(props) {
    super(props);
    this.results = this.props.navigation.state.params.results;

    if (this.results.length === 1) {
      this.results = Array(5).fill(this.results[0]);
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <StationCellView station={item} navigation={this.props.navigation} />
  );

  render() {
    return (
      <FlatList
        style={{ marginLeft: 5, marginRight: 5 }}
        data={this.results}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

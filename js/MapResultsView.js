import React, { Component } from "react";
import { Text, Touchable, FlatList } from "react-native";

export default class MapResultsView extends Component {
  render() {
    return (
      <Text>{JSON.stringify(this.props.navigation.state.params.results)}</Text>
    );
  }
}

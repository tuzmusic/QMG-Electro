import React, { Component } from "react";
import { Text, Touchable, FlatList } from "react-native";

export default class MapResultsView extends Component {

  renderItem = ({ item }) => {
    return <Text>{item.formatted_address}</Text>;
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };

  render() {
    return (
      <FlatList
        data={this.props.navigation.state.params.results}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

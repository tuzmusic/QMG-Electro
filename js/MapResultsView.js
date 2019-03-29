import React, { Component } from "react";
import { Text, Touchable, FlatList } from "react-native";

export default class MapResultsView extends Component {
  // static navigationOptions = {
  //   title: this.props.navigation.state.params.searchText
  // };

  static navigationOptions = ({ navigation }) => {
    console.log(navigation.state.params.searchText);
    return {
      title: navigation.getParam("searchText")
    };
  };

  constructor(props) {
    super(props);
    this.results = this.props.navigation.state.params.results;

    if (this.results.length === 1) {
      this.results = Array(5).fill(this.results[0]);
    }
  }

  renderItem = ({ item }) => {
    return <Text>{item.formatted_address}</Text>;
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };

  render() {
    return (
      <FlatList
        data={this.results}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

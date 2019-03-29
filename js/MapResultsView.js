import React, { Component } from "react";
import { View, Text, Touchable, FlatList } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

export default class MapResultsView extends Component {
  static navigationOptions = ({ navigation }) => {
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
    return (
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <View style={styles.cellContainer}>
          <Text>{item.name}</Text>
          <Text>Owner: {item.owner.name}</Text>
          <Text>{item.address}</Text>
          <Text>
            {"Price: " + (item.price === 0 ? "Free" : `$${item.price}`)}
          </Text>
          <Text>{item.availableNow ? "Available!" : "Unavailable"}</Text>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };

  render() {
    return (
      <FlatList
        style={styles.flatlistContainer}
        data={this.results}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = F8StyleSheet.create({
  flatlistContainer: {},
  cellContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  }
});

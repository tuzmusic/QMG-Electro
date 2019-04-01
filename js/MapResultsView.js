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
      <View style={styles.flatlistContainer}>
        <View style={styles.cellContainer}>
          <CellTextRow style={text.name}>{item.name}</CellTextRow>
          <CellTextRow>Owner: {item.owner.name}</CellTextRow>
          <CellTextRow style={text.address}>
            {item.address}
          </CellTextRow>
          <CellTextRow>
            {"Price: " + (item.price === 0 ? "Free" : `$${item.price}`)}
          </CellTextRow>
          <CellTextRow>{item.availableNow ? "Available!" : "Unavailable"}</CellTextRow>
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

class CellTextRow extends Component {
  render() {
    return <Text style={[{padding:1}, this.props.style]}>
      {this.props.children}
    </Text>
  }
}

const text = F8StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  address: {
    marginLeft: 10
  }
});

const styles = F8StyleSheet.create({
  flatlistContainer: {
    marginLeft: 5,
    marginRight: 5,
  },
  cellContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  }
});

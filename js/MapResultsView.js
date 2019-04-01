import React, { Component } from "react";
import { View, Text, Touchable, FlatList, Image } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

class CellTextRow extends Component {
  render() {
    return (
      <Text style={[{ padding: 1 }, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

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
          <View style={styles.textContainer}>
            <CellTextRow style={text.name}>{item.name}</CellTextRow>
            <CellTextRow style={text.address}>{item.address}</CellTextRow>
            <CellTextRow>
              {"Price: " + (item.price === 0 ? "Free" : `$${item.price}`)}
            </CellTextRow>
            <CellTextRow>
              {item.availableNow ? "Available!" : "Unavailable"}
            </CellTextRow>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={[styles.image]}
              source={require("../assets/logos/BOLTIcon.jpg")}
            />
            <CellTextRow style={text.caption}>{item.owner.username}</CellTextRow>
          </View>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

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

const text = F8StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  address: {
    // marginLeft: 10
  },
  caption: {
    textAlign: 'center',
  },
});

const styles = F8StyleSheet.create({
  flatlistContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  cellContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  textContainer: {
    flex: 5,
    marginRight: 10,
  },
  imageContainer: {
    flex: 2,
  },
  image: {
    flex: 1, 
    resizeMode: 'contain',
    width: null,
    height: 20
  }
});

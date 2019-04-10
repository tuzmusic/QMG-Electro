import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

const CellTextRow = props => (
  <Text style={[{ padding: 1 }, props.style]}>{props.children}</Text>
);

export default class ListingCellView extends Component {
  render() {
    return (
      <View style={styles.cellContainer}>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={this.props.onTextPress}
        >
          <CellTextRow style={text.name}>{this.props.station.title.rendered}</CellTextRow>
        </TouchableOpacity>
      </View>
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
    textAlign: "center"
  }
});

const styles = F8StyleSheet.create({
  cellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  textContainer: {
    // borderWidth: 0.5,
    flex: 5,
    marginRight: 10
  },
  imageContainer: {
    // borderWidth: 0.5,
    flex: 2,
    padding: 7
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: 20
  }
});

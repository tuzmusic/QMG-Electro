import React, { Component } from "react";
import { Text, View, Image } from "react-native";
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

export default class StationCellView extends Component {
  render() {
    return (
      <View style={styles.cellContainer}>
        <View style={styles.textContainer}>
          <CellTextRow style={text.name}>{this.props.station.name}</CellTextRow>
          <CellTextRow style={text.address}>{this.props.station.address}</CellTextRow>
          <CellTextRow>
            {"Price: " +
              (this.props.station.price === 0 ? "Free" : `$${this.props.station.price}`)}
          </CellTextRow>
          <CellTextRow>
            {this.props.station.availableNow ? "Available!" : "Unavailable"}
          </CellTextRow>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image]}
            source={require("../assets/logos/BOLTIcon.jpg")}
          />
          <CellTextRow style={text.caption}>
            {this.props.station.owner.username}
          </CellTextRow>
        </View>
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
  flatlistContainer: {
    marginLeft: 5,
    marginRight: 5
  },
  cellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  textContainer: {
    flex: 5,
    marginRight: 10
  },
  imageContainer: {
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

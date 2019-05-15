import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import { View, TouchableOpacity } from "react-native";
import F8StyleSheet from "../components/F8StyleSheet";

const CellTextRow = props => (
  <BLText style={[{ padding: 1 }, props.style]}>{props.children}</BLText>
);

export default (ListingCellView = props => {
  const station = props.station;
  console.log("ListingCellView station", station);

  return (
    <View style={styles.cellContainer}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={props.onTextPress}
      >
        <CellTextRow style={text.name}>{station.name}</CellTextRow>
        <CellTextRow style={text.address}>{station.address}</CellTextRow>
      </TouchableOpacity>
    </View>
  );
});

const text = F8StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  address: {
    fontSize: 16
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
    flex: 5,
    marginRight: 10
  },
  imageContainer: {
    flex: 2,
    padding: 7
  }
});

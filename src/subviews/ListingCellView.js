import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import F8StyleSheet from "../components/F8StyleSheet";
import HTML from "react-native-render-html";

const CellTextRow = props => (
  <BLText style={[{ padding: 1 }, props.style]}>{props.children}</BLText>
);

export default class ListingCellView extends Component {
  render() {
    return (
      <View style={styles.cellContainer}>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={this.props.onTextPress}
        >
          <CellTextRow style={text.name}>
            {this.props.station.title}
          </CellTextRow>
          <CellTextRow style={text.address}>
            {this.props.station.address}
          </CellTextRow>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: 20
  }
});

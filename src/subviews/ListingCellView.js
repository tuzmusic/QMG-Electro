// @flow
import type { ElectroLocation, Action } from "../../flowTypes";
import type Station from "../models/Station";

import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import { View, TouchableOpacity } from "react-native";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";

const CellTextRow = props => (
  <BLText style={[{ padding: 1 }, props.style]}>{props.children}</BLText>
);

type Props = {
  station: Station,
  onTextPress: () => mixed,
  location: ElectroLocation
};

class ListingCellView extends Component<Props> {
  render() {
    const station = this.props.station;
    return (
      <View style={styles.cellContainer}>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={this.props.onTextPress}
        >
          <CellTextRow style={text.title}>{station.title}</CellTextRow>
          <CellTextRow style={text.address}>{station.address}</CellTextRow>
        </TouchableOpacity>
        {this.props.location && (
          <BLText>
            {station.distanceFromLocation(this.props.location)} mi.
          </BLText>
        )}
      </View>
    );
  }
}

export default connect(state => ({ location: state.main.currentRegion }))(
  ListingCellView
);

const text = F8StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 19
  },
  address: {
    fontSize: 15
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

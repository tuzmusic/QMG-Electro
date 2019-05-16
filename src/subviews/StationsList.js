// @flow

import type Station from "../models/Station";
import type { ElectroLocation } from "../../flowTypes";
import React from "react";
import { connect } from "react-redux";
import { FlatList, View } from "react-native";
import ListingCellView from "../subviews/ListingCellView";

type Props = {
  stations: Station[],
  navigation: {},
  onTextPress: (item: Station) => mixed,
  location: ElectroLocation
};

const StationsList = (props: Props) => {
  return (
    <View>
      <FlatList
        data={props.stations}
        renderItem={({ item }) => (
          <ListingCellView
            station={item}
            navigation={props.navigation}
            onTextPress={() => props.onTextPress(item)}
          />
        )}
        style={{ marginLeft: 5, marginRight: 5 }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};
export default connect(state => ({ location: state.main.currentRegion }))(
  StationsList
);

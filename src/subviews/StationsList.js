// @flow

import type Station from "../models/Station";
import type { ElectroLocation } from "../../flowTypes";
import React from "react";
import { connect } from "react-redux";
import { FlatList, View, Text } from "react-native";
import ListingCellView from "../subviews/ListingCellView";

type Props = {
  stations: Station[],
  navigation: {},
  onTextPress: (item: Station) => mixed,
  location: ElectroLocation
};

const EmptyStationList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>
        Sorry, there are no stations within the search area.
      </Text>
      <Text style={styles.emptyListText}>
        Try searching a different region, or expanding the search radius.
      </Text>
    </View>
  );
};

const StationsList = (props: Props) => {
  return (
    <View style={{ width: "100%" }}>
      {props.stations.length === 0 ? (
        <EmptyStationList />
      ) : (
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
      )}
    </View>
  );
};
export default connect()(StationsList);

const styles = {
  emptyListContainer: {
    justifyContent: "center"
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18
  }
};

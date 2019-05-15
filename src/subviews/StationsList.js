import React from "react";
import { FlatList, View } from "react-native";
import ListingCellView from "../subviews/ListingCellView";

export default (StationsList = props => {
  console.log("StationsList stations:", props.stations);

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
});

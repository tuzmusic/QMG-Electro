import React from "react";
import { FlatList, View } from "react-native";
import ListingCellView from "../subviews/ListingCellView";

export default (StationsList = props => (
  <View>
    <FlatList
      style={{ marginLeft: 5, marginRight: 5 }}
      data={props.stations}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListingCellView
          station={item}
          navigation={props.navigation}
          onTextPress={props.onTextPress?.bind(this, item)}
          onImagePress={props.onImagePress?.bind(this, item.owner)}
        />
      )}
    />
  </View>
));

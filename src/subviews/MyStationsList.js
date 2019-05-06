import React from "react";
import { FlatList, Text, View } from "react-native";
import ListingCellView from "../subviews/ListingCellView";
import LoadingIndicator from "../components/LoadingIndicator";
import StationsList from "./StationsList";

export default (MyStationsList = props => {
  console.log("MyStationsList mounted with stations:", props.stations);

  return props.stations.length === 0 ? null : (
    <View>
      {Object.values(props.stations).map(s => (
        <Text key={s.id}>{s.title}</Text>
      ))}
    </View>
  );
});

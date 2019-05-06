import React from "react";
import { FlatList, Text, View } from "react-native";
import StationsListContainer from "./StationsListContainer";

export default (MyStationsList = ({ stations }) => {
  console.log("mounting MyStations with stations:", stations);
  
  return (
    <View>
      <Text>Hello</Text>
      <View>
        <StationsListContainer stations={stations} />
      </View>
    </View>
  );
});

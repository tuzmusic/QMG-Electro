import React, { Component } from "react";
import { View } from "react-native";
import LoadingIndicator from "../components/LoadingIndicator";

import StationsList from "./StationsList";

export default class StationsListContainer extends Component {
  render() {
    const { props } = this;
    const stations = Object.values(props.stations);

    return (
      <View style={{ width: "100%" }}>
        {props.showLoading && (
          <LoadingIndicator
            message={"Loading Stations..."}
            isVisible={props.isLoading}
          />
        )}
        <StationsList
          stations={stations}
          navigation={props.navigation}
          onTextPress={props.onTextPress}
          isLoading={props.isLoading}
        />
      </View>
    );
  }
}

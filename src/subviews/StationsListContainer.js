import React, { Component } from "react";
import { View } from "react-native";
import LoadingIndicator from "../components/LoadingIndicator";

import StationsList from "./StationsList";

export default class StationsListContainer extends Component {
  render() {
    const {props} = this
    return (
      <View>
        {props.showLoading && <LoadingIndicator
          message={"Loading Stations..."}
          isVisible={props.isLoading}
        />}
        <StationsList
          stations={Object.values(props.stations)}
          navigation={props.navigation}
          onTextPress={props.onTextPress}
          onImagePress={props.onImagePress}
          isLoading={props.isLoading}
        />
      </View>
    );
  }
}

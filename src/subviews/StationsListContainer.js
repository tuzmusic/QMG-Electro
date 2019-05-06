import React, { Component } from "react";
import StationsList from "./StationsList";

export default class StationsListContainer extends Component {
  render() {
    return (
      <StationsList
        stations={Object.values(this.props.stations)}
        navigation={this.props.navigation}
        onTextPress={this.props.onTextPress}
        onImagePress={this.props.onImagePress}
        isLoading={this.props.isLoading}
      />
    );
  }
}

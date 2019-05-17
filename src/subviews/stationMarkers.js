// @flow
import type { ElectroLocation } from "../../flowTypes";
import type Station from "../models/Station";

import React, { Component } from "react";
import { MapView } from "expo";
import { View, Button, Text, Platform, TextInput } from "react-native";
import { BLText } from "../components/StyledComponents";
import TabBarIcon from "../components/TabBarIcon";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
import {
  getLocationAsync,
  setCurrentRegion
} from "../redux/actions/locationActions";
import { setCurrentStationID } from "../redux/actions/stationActions";
import ListingCellView from "../subviews/ListingCellView";
const { Marker, Callout } = MapView;

type Props = {
  stations: { [key: string]: Station },
  onMarkerPress: () => void
};

const ElectroMarker = ({ station, onPress }) => {
  return (
    <Marker coordinate={station.location}>
      <Callout onPress={onPress.bind(null, station)}>
        <Text>{station.title}</Text>
      </Callout>
    </Marker>
  );
};

const StationMarkers = (props: Props) => {
  return Object.keys(props.stations).map<Marker>((key: string) => {
    const station = props.stations[key];
    return (
      <ElectroMarker
        key={station.id}
        station={station}
        onPress={props.onMarkerPress}
      />
    );
  });
};

export default StationMarkers;

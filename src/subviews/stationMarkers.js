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

const StationMarkers = (props: Props) => {
  return Object.values(props.stations).map(station => {
    return (
      <Marker key={station.id} coordinate={station.location}>
        <Callout onPress={props.onMarkerPress.bind(null, station)}>
          <ListingCellView station={station} containerStyle={{ width: 350 }} />
        </Callout>
      </Marker>
    );
  });
};

export default StationMarkers;

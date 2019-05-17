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
const CellTextRow = props => (
  <BLText style={[{ padding: 0.5 }, props.style]}>{props.children}</BLText>
);

const ElectroMarker = ({ station, onPress }) => {
  return (
    <Marker coordinate={station.location}>
      <Callout onPress={onPress.bind(null, station)}>
        <CellTextRow style={text.title}>{station.title}</CellTextRow>
        <CellTextRow style={text.title}>{station.title}</CellTextRow>
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

const baseSize = 15;
const text = F8StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: baseSize
  },
  address: {
    fontSize: baseSize
  },
  distance: {
    fontSize: baseSize
  },
  caption: {
    textAlign: "center"
  },
  price: {
    fontSize: baseSize,
    color: "green"
  }
});

const styles = F8StyleSheet.create({
  rightSection: {
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  leftSection: {},
  cellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  textContainer: {
    flex: 5,
    marginRight: 10
  },
  imageContainer: {
    flex: 2,
    padding: 7
  }
});

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
import pluralize from "pluralize";
const { Marker, Callout } = MapView;

type Props = {
  stations: { [key: string]: Station },
  onMarkerPress: () => void,
  onCalloutPress: () => void,
  location: ElectroLocation
};
const CellTextRow = props => (
  <BLText style={[{ padding: 0.5 }, props.style]}>{props.children}</BLText>
);

const StationMarkers = (props: Props) => {
  return Object.keys(props.stations).map<Marker>((key: string) => {
    const station = props.stations[key];
    const distanceString =
      pluralize(
        "mile",
        station.distanceFromLocation(props.location) || 0,
        true
      ) + " away";
    return (
      station.location && (
        <Marker
          coordinate={station.location}
          key={key}
          onPress={props.onMarkerPress.bind(null, station)}
        >
          <Callout
            onPress={props.onCalloutPress.bind(null, station)}
            style={styles.callout}
          >
            <CellTextRow style={text.title}>{station.title}</CellTextRow>
            <CellTextRow style={text.distance}>{distanceString}</CellTextRow>
            <CellTextRow style={text.price}>
              {station.priceString()}
            </CellTextRow>
          </Callout>
        </Marker>
      )
    );
  });
};

export default connect(state => ({ location: state.main.currentRegion }))(
  StationMarkers
);

const baseSize = 15;
const text = F8StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: baseSize + 1
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
  callout: {
    maxWidth: 250
  },
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

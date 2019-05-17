// @flow

import type Station from "./src/models/Station";
export type ElectroLocation = {
  latitude: number,
  longitude: number,
  latitudeDelta?: number | string,
  longitudeDelta?: number | string,
  showMarker?: boolean,
  accuracy?: number
};

export type OpenObject = { [key: string]: any };

export type Action =
  | { type: "GET_USERS" }
  | { type: "GET_STATIONS_START" }
  | { type: "GET_STATIONS_SUCCESS", stations: Station[] }
  | { type: "GET_STATIONS_FAILURE", error: string }
  | {
      type: "CREATE_STATION" | "UPDATE_STATION" | "DELETE_STATION",
      station: Station
    }
  | { type: "SET_CURRENT_STATION", stationID: number | string }
  | { type: "SAVE_STATIONS" }
  | {
      type: "SET_CURRENT_REGION" | "SET_CURRENT_USER_LOCATION",
      region: ElectroLocation
    }
  | { type: "SET_SEARCH_RADIUS", radius: number };

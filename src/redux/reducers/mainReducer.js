// @flow

import { AsyncStorage } from "react-native";

// #region TYPES
type ElectroLocation = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
  showMarker: boolean
};

type State = {
  +stations: { [key: string]: {} }, // TO-DO: Define Station type
  +currentStationID: ?number,
  +isLoading: boolean,
  +error: ?string,
  +currentRegion: ?ElectroLocation,
  +currentUserLocation: ?ElectroLocation,
  +selectedLocation: ?ElectroLocation
};
// #endregion

const initialState = {
  stations: {},
  currentStationID: null,
  isLoading: false,
  error: null,
  currentRegion: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
    showMarker: false
  },
  currentUserLocation: null,
  selectedLocation: null
};

export default function mainReducer(
  state: State = initialState,
  action: { [key: string]: any }
): State {
  // if (action.type.includes("STATION")) console.log(action.type);

  switch (action.type) {
    // #region GET STATIONS
    case "GET_STATIONS_START":
      return { ...state, isLoading: true };
    case "GET_STATIONS_SUCCESS":
      return {
        ...state,
        stations: { ...state.stations, ...action.stations },
        isLoading: state.stations === 0
      };
    case "GET_STATIONS_FAILURE":
      console.warn("Couldn't get stations:", action.error);
      return { ...state, error: action.error, isLoading: false };
    // #endregion
    // #region CREATE/UPDATE/DELETE STATIONS
    case "CREATE_STATION":
      const newStations = {
        ...state.stations,
        [action.station.id]: action.station
      };
      return { ...state, stations: newStations };
    case "UPDATE_STATION":
      return {
        ...state,
        stations: { ...state.stations, [action.station.id]: action.station }
      };
    case "DELETE_STATION":
      const clonedStations = { ...state.stations };
      delete clonedStations[action.station.id];
      return { ...state, stations: clonedStations };
    // #endregion
    // #region APP ACTIONS
    case "SET_CURRENT_STATION":
      return { ...state, currentStationID: action.stationID };
    case "SAVE_STATIONS":
      const data = { stations: state.stations, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      AsyncStorage.setItem("electro_stations", storageString);
      return state;
    // #endregion
    // #region LOCATION ACTIONS
    case "SET_CURRENT_REGION":
      return { ...state, currentRegion: action.region };
    case "SET_CURRENT_USER_LOCATION":
      return { ...state, currentUserLocation: action.region };
    // #endregion
    default:
      return state;
  }
}

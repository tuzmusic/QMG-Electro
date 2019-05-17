// @flow
import type { Action, ElectroLocation } from "../../../flowTypes";
import type { State } from "../reducers/mainReducer";
import { AsyncStorage } from "react-native";
import { Constants, Location, Permissions } from "expo";

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;

export function getUsers(): ThunkAction {
  return async dispatch => {
    try {
      const data = await AsyncStorage.getItem("electro_users");
      if (data === null) {
        console.log("requested key (electro_users) returns null");
        return;
      }
      const users = JSON.parse(data).users;
      dispatch({ type: "GET_USERS", users });
    } catch (error) {
      console.log("Couldn't get users:", error);
    }
  };
}

export function getLocationAsync(): ThunkAction {
  return async dispatch => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return console.warn("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    location.coords.accuracy = 0.05; // default received accuracy is way too broad.
    let { latitude, longitude, accuracy } = location.coords;
    let region = { latitude, longitude, accuracy };
    dispatch(setCurrentUserLocation(region));
    dispatch(setCurrentRegion(region));
  };
}

export function setCurrentRegion(region: ElectroLocation) {
  debugger;
  const newRegion = { ...region, ...calculateRegion(region) };
  newRegion.accuracy = 0.05;
  // console.log(newRegion);

  return { type: "SET_CURRENT_REGION", region: newRegion };
}

export function setCurrentUserLocation(location: ElectroLocation) {
  const region = calculateRegion(location);
  return { type: "SET_CURRENT_USER_LOCATION", region };
}

export function setSearchRadius(radius: number) {
  return { type: "SET_SEARCH_RADIUS", radius };
}

function calculateRegion({ latitude, longitude, accuracy = 0.05 }) {
  const oneDegreeOfLongitudeInMeters = 111.32;
  const circumference = 40075 / 360;
  const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
  const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
  const region = { latitude, longitude, latitudeDelta, longitudeDelta };
  return region;
}

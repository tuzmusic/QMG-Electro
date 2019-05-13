import { AsyncStorage } from "react-native";
import { Constants, Location, Permissions } from "expo";

export function getUsers() {
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

export function getLocationAsync() {
  return async dispatch => {
    console.log("getLocationAsync - from userActions");

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return console.warn("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    location.coords.accuracy = 0.1; // default received accuracy is way too broad.
    dispatch(setCurrentUserLocation(location));
    dispatch(setCurrentRegion(location));
  };
}

export function setCurrentRegion({ coords }) {
  const region = calculateRegion(coords);
  return { type: "SET_CURRENT_REGION", region };
}

export function setCurrentUserLocation({ coords }) {
  const region = calculateRegion(coords);
  return { type: "SET_USER_LOCATION", region };
}

function calculateRegion({ latitude, longitude, accuracy }) {
  const oneDegreeOfLongitudeInMeters = 111.32;
  const circumference = 40075 / 360;
  const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
  const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
  const region = { latitude, longitude, latitudeDelta, longitudeDelta };
  return region;
}

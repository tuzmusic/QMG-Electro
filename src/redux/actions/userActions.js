import { AsyncStorage } from "react-native";

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

export function setCurrentRegion({coords}) {
  const region = calculateRegion(coords)
  return { type: "SET_CURRENT_REGION", region };
}

function calculateRegion({ latitude, longitude, accuracy }) {
  const oneDegreeOfLongitudeInMeters = 111.32;
  const circumference = 40075 / 360;
  const latitudeDelta = accuracy / oneDegreeOfLongitudeInMeters;
  const longitudeDelta = accuracy * (1 / Math.cos(latitude * circumference));
  const region = { latitude, longitude, latitudeDelta, longitudeDelta };
  return region;
}

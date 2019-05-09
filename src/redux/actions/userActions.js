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

export function setUserLocation(location) {
  return { type: "SET_CURRENT_REGION", location };
}

import { AsyncStorage } from "react-native";
import User from "../../models/User";

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

export function createUser(userInfo) {
  return async dispatch => {
    const user = new User(userInfo);
    try {
      // const returnedUser = await postUserToApi(user);
      await dispatch({ type: "CREATE_USER", user }); // will eventually be dispatching returnedUser
      dispatch({ type: "SAVE_USERS" });
      return user;
    } catch (error) {
      dispatch({ type: "CREATE_USER_ERROR", payload: error });
    }
  };
}

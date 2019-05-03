import { AsyncStorage } from "react-native";

const initialState = {
  stations: [],
  user: null,
  isLoading: false,
  error: null,
  users: {}
};

export default (authReducer = (
  state = initialState,
  { user, users, error, ...action }
) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user,
        users: { ...state.users, [user.id]: user },
        isLoading: false
      };
    case "LOGIN_FAILURE":
      return { ...state, error, isLoading: false };
    case "LOGOUT":
      return {...state, user: null}
    case "GET_USERS":
      return { ...state, users };
    case "SAVE_USERS":
      const data = { users: state.users, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      AsyncStorage.setItem("electro_users", storageString);
      return state;
    default:
      return state;
  }
});

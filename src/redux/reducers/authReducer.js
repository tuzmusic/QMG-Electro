import { AsyncStorage } from "react-native";

const initialState = {
  stations: [],
  user: null,
  isLoading: false,
  error: null,
  users: {}
};

export default (authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.user,
        users: { ...state.users, [action.user.id]: action.user },
        isLoading: false
      };
    case "LOGIN_FAILURE":
      return { ...state, error: action.error, isLoading: false };
    case "GET_USERS":
      return { ...state, users: action.users };
    case "SAVE_USERS":
      const data = { users: state.users, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      console.log(
        "Saving users to storage",
        Object.values(data.users).map(u => u.username)
      );
      AsyncStorage.setItem("electro_users", storageString);
      return state;

    default:
      return state;
  }
});

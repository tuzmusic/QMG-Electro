import { AsyncStorage } from "react-native";

const initialState = {
  users: {
    1: {id: 1, username:"user1"},
    2: {id: 1, username:"user2"},
    3: {id: 1, username:"user3"},
    4: {id: 1, username:"user4"}
  }
};

export default (authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.users };
    case "ADD_USERS":
      return {
        ...state,
        users: { ...state.users, [action.user.id]: action.user }
      };
    case "SAVE_USERS":
      console.log("Saving users to storage");
      const data = { users: state.users, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      AsyncStorage.setItem("electro_users", storageString)
        .then(() => {
          // debugger;
        })
        .catch(() => {
          // debugger;
        });
      return state;

    default:
      return state;
  }
});

import { AsyncStorage } from "react-native";

const initialState = {
  users: {
    1: { id: 1, username: "user1" },
    2: { id: 2, username: "user2" },
    3: { id: 3, username: "user3" },
    4: { id: 4, username: "user4" }
  }
};

export default (usersReducer = (state = initialState, action) => {
  return state
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.users };
    case "SAVE_USERS":
      console.log("Saving users to storage");
      const data = { users: state.users, savedDate: new Date() };
      const storageString = JSON.stringify(data);
      debugger
      AsyncStorage.setItem("electro_users", storageString)
        .then(() => {
          debugger;
        })
        .catch(() => {
          debugger;
        });
      return state;

    default:
      return state;
  }
});

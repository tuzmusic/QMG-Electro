const initialState = {
  users: {},
};

export default (authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS": 
    return { ...state, users: action.users }
    case "ADD_USERS":
      return { ...state, users: {...state.users, [action.user.id]: action.user } };
    default:
      return state;
  }
});

const url = "http://127.0.0.1:3000/users";

export function login() {
  return dispatch => {
    dispatch({ type: "LOGIN_START" });
    fetch(url) // this will need to be a POST session (not a GET user)
      .then(res => res.json())
      .then(users => {
        console.log("Login succeeded");
        dispatch({ type: "LOGIN_SUCCESS", payload: users[0] });
        // this.props.navigation.navigate("Main");
      })
      .catch(error => {
        console.warn("login failed");
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      });
  };
}


export function login() {
  console.log("logging in from authActions");
  
  return dispatch => {
    dispatch({ type: "LOGIN_START" });
  };
}

const usersUrl = "http://127.0.0.1:3000/users";

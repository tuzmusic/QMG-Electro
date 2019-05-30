import axios from "axios";

export const ApiUrls = {
  login: "http://joinelectro.com/wp-json/auth/login",
  nonce:
    "https://joinelectro.com/x1H9JH7tZAb1DoJ/get_nonce/?controller=user&method=register",
  register: "https://joinelectro.com/x1H9JH7tZAb1DoJ/user/register",
  logout: "http://joinelectro.com/wp-json/auth/logout"
};

export function assignUser(user) {
  return async dispatch => {
    await dispatch({ type: "LOGIN_SUCCESS", user });
    dispatch({ type: "SAVE_USERS" });
  };
}

export function logout() {
  return { type: "LOGOUT" };
}

export function login() {
  return dispatch => {
    dispatch({ type: "LOGIN_START" });
    fetch("http://127.0.0.1:3000/users") // this will need to be a POST session (not a GET user)
      .then(res => res.json())
      .then(users => {
        console.log("Login succeeded");
        dispatch({ type: "LOGIN_SUCCESS", user: users[0] });
      })
      .catch(error => {
        console.warn("login failed");
        dispatch({ type: "LOGIN_FAILURE", error });
      });
  };
}

import { put, call, takeEvery } from "redux-saga/effects";
import Sugar from "sugar";
Sugar.extend();

export async function registerWithApi({ email, username, password }) {
  try {
    const nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
    if (!nonce) throw Error("Could not get nonce");
    const res = await axios.get(ApiUrls.register, {
      params: {
        nonce,
        username,
        email,
        display_name: username,
        user_pass: password
      }
    });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function loginWithApi(creds) {
  try {
    const res = await axios.get(ApiUrls.login, { params: creds });
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function logoutWithApi() {
  try {
    const res = await axios.get(ApiUrls.logout);
    return res.data;
  } catch (err) {
    return err;
  }
}

export function* loginSaga({ username, password }) {
  const creds = { username, password };
  let res = yield call(loginWithApi, creds);
  if (res.data) {
    yield put({ type: "LOGIN_SUCCESS", user: res.data });
  } else if (res.code) {
    yield put({ type: "LOGIN_FAILURE", error: res.code.titleize() });
  }
}

export function* logoutSaga() {
  try {
    let res = yield call(logoutWithApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error });
  }
}

export function* watchLogin() {
  yield takeEvery("LOGIN_START", loginSaga);
}

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

import { put, call, takeEvery, all } from "redux-saga/effects";
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
    // console.log("API RESULT:", res);
    if (res.data.data) {
      return res.data;
    } else if (res.data.code) {
      return Error(res.data.code.titleize());
    } // else, it should be an actual error
  } catch (err) {
    // console.log("API ERROR:", err);
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

export function* loginSaga(payload) {
  console.log(payload);
  const creds = { username, password };
  try {
    const res = yield call(loginWithApi, { username, password });
    yield put({ type: "LOGIN_SUCCESS", user: res.data }); // not sure we NEED any user data
  } catch (error) {
    // console.log("ERROR FROM loginSaga CODE", error.message);
    // console.log("---end of error---");

    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export function* logoutSaga() {
  try {
    yield call(logoutWithApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error });
  }
}

export function* registerSaga({ email, username, password }) {
  try {
    let res = yield call(registerWithApi, { email, username, password });
    yield put({ type: "REGISTRATION_SUCCESS", userId: res.user_id });
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error });
  }
}

export function* watchLogin() {
  yield takeEvery("LOGIN_START", loginSaga);
}
export function* watchLogout() {
  yield takeEvery("LOGOUT_START", logoutSaga);
}
export function* watchRegister() {
  yield takeEvery("REGISTRATION_START", registerSaga);
}

export default function* authSaga() {
  yield all([watchLogin(), watchLogout(), watchRegister()]);
}

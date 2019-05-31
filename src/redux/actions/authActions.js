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

import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import Sugar from "sugar";
Sugar.extend();

export async function registerWithApi({ email, username, password }) {
  try {
    const nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
    if (!nonce) throw Error("Could not get nonce");
    const res = await axios.get(ApiUrls.register, {
      params: {
        username,
        email,
        nonce,
        display_name: username,
        user_pass: password
      }
    });
    if (res.data.error) {
      throw Error(res.data.error);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function loginWithApi(creds) {
  try {
    const res = await axios.get(ApiUrls.login, { params: creds });
    if (res.data.data) {
      return res.data;
    } else if (res.data.code) {
      throw Error(res.data.code.titleize());
    } // else, it should be an actual error
  } catch (err) {
    throw err;
  }
}

export async function logoutWithApi() {
  try {
    const res = await axios.get(ApiUrls.logout);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export function* loginSaga({ creds }) {
  try {
    const res = yield call(loginWithApi, creds);
    yield put({ type: "LOGIN_SUCCESS", user: res.data }); // not sure we NEED any user data
  } catch (error) {
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

export function* registerSaga({ info }) {
  try {
    let res = yield call(registerWithApi, info);
    yield put({ type: "REGISTRATION_SUCCESS", userId: res.user_id });
  } catch (error) {
    yield put({ type: "REGISTRATION_FAILURE", error: error.message });
  }
}

function* watchLogin() {
  yield takeEvery("LOGIN_START", loginSaga);
}
function* watchLogout() {
  yield takeEvery("LOGOUT_START", logoutSaga);
}
function* watchRegister() {
  yield takeEvery("REGISTRATION_START", registerSaga);
}

export default function* authSaga() {
  yield all([watchLogin(), watchLogout(), watchRegister()]);
}

export function login({ username, password }) {
  return { type: "LOGIN_START", creds: { username, password } };
}

export function logout() {
  return { type: "LOGOUT_START" };
}

export function register({ username, email, password }) {
  return { type: "REGISTRATION_START", info: { username, email, password } };
}

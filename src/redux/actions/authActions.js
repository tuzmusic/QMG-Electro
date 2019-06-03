export const ApiUrls = {
  login: "https://joinelectro.com/x1H9JH7tZAb1DoJ/user/generate_auth_cookie/",
  nonce:
    "https://joinelectro.com/x1H9JH7tZAb1DoJ/get_nonce/?controller=user&method=register",
  register: "https://joinelectro.com/x1H9JH7tZAb1DoJ/user/register",
  logout: "http://joinelectro.com/wp-json/auth/logout"
};

import axios from "axios";
import { put, call, takeEvery, all } from "redux-saga/effects";
import Sugar from "sugar";
Sugar.extend();

export async function registerWithApi({ email, username, password }) {
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
  return res.data;
}

export async function loginWithApi(creds) {
  console.log(creds);

  const res = await axios.get(ApiUrls.login, { params: creds });
  return res.data;
}

export async function logoutWithApi() {
  const res = await axios.get(ApiUrls.logout);
  return res.data;
}

export function* loginSaga({ creds }) {
  try {
    const { error, ...user } = yield call(loginWithApi, creds);
    yield put(
      error ? { type: "LOGIN_FAILURE", error } : { type: "LOGIN_SUCCESS", user }
    );
  } catch (error) {
    debugger;
    yield put({ type: "LOGIN_FAILURE", error: error.message });
  }
}

export function* logoutSaga() {
  try {
    yield call(logoutWithApi);
    yield put({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    yield put({ type: "LOGOUT_FAILURE", error: error.message });
  }
}

export function* registerSaga({ info }) {
  try {
    let { error, cookie, user_id } = yield call(registerWithApi, info);
    yield put(
      error
        ? { type: "REGISTRATION_FAILURE", error }
        : {
            type: "REGISTRATION_SUCCESS",
            user: {
              username: info.username,
              email: info.email,
              userId: user_id,
              cookie
            }
          }
    );
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

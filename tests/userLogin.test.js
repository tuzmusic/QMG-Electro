import { put } from "redux-saga/effects";
import {
  login,
  loginSaga,
  loginWithApi,
  logout,
  logoutWithApi,
  logoutSaga,
  register,
  registerSaga,
  registerWithApi,
  ApiUrls
} from "../src/redux/actions/authActions";
import {
  loginResponse,
  registerResponse,
  creds,
  registration,
  actions
} from "./__mocks__/loginResponse";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SagaTester from "redux-saga-tester";
import authSaga from "../src/redux/actions/authActions";

function setupMockAdapter() {
  ``;
  mock = new MockAdapter(axios);
  mock
    // register
    .onGet(ApiUrls.nonce)
    .reply(200, registerResponse.nonce)
    .onGet(ApiUrls.register, { params: registration.apiParams })
    .reply(200, registerResponse.success)
    .onGet(ApiUrls.register, { params: registration.badUserApiParams })
    .reply(200, registerResponse.usernameTaken)
    // login
    .onGet(ApiUrls.login, { params: creds.success })
    .reply(200, loginResponse.success)
    .onGet(ApiUrls.login, { params: creds.badUser })
    .reply(200, loginResponse.failure)
    // logout
    .onGet(ApiUrls.logout)
    .reply(200, loginResponse.logout);
}
let mock;
setupMockAdapter();

describe("API Calls", () => {
  describe("register api call", () => {
    it("should return a user upon successful registration", async () => {
      let res = await registerWithApi(registration.userInfo);
      expect(res).toEqual(registerResponse.success);
    });

    it("should return an error when passed a username that already exists", async () => {
      try {
        await registerWithApi(registration.badUserInfo);
      } catch (error) {
        expect(error).toEqual(registerResponse.usernameError);
      }
    });

    it("should return a generic error if there's some other error", async () => {
      try {
        await registerWithApi(registration.unhandledInfo);
      } catch (error) {
        expect(error.message).toEqual("Request failed with status code 404");
      }
    });

    xit("should give a special alert when it receives an HTML response, indicating that the JSON APIs have been disabled", () => {});
  });

  describe("login api call", () => {
    it("calls the API and simply returns the response", async () => {
      let res = await loginWithApi(creds.success);
      expect(res).toEqual(loginResponse.success);
    });

    it("returns the response, without throwing an error, even for invalid credentials", async () => {
      let res = await loginWithApi(creds.badUser);
      expect(res).toEqual(loginResponse.failure);
    });

    it("throws an error if the API fetch fails", async () => {
      try {
        await loginWithApi(registration.unhandledInfo);
      } catch (error) {
        expect(error.message).toEqual("Request failed with status code 404");
      }
    });
  });

  describe("logout api call", () => {
    it("should return a logout message when successful", async () => {
      let res = await logoutWithApi();
      expect(res).toEqual(loginResponse.logout);
    });

    it("should handle errors", async () => {
      mock.resetHandlers();
      mock.onGet(ApiUrls.logout).networkErrorOnce();
      try {
        const res = await logoutWithApi();
        expect(res).toBe(undefined);
        setupMockAdapter();
      } catch (error) {
        expect(error).toEqual(Error("Network Error"));
        setupMockAdapter();
      }
    });
  });
});

describe("Saga Actions", () => {
  describe("login action", () => {
    let gen;
    afterEach(() => {
      expect(gen.next().done).toBe(true);
    });

    it("should return an object containing a cookie and user info on a successful login", () => {
      gen = loginSaga(creds.success);
      gen.next(); // call api
      expect(gen.next(loginResponse.success).value).toEqual(
        put({ type: "LOGIN_SUCCESS", user: loginResponse.success })
      );
    });

    it("should return a failure action and error message when passed invalid credentials", () => {
      gen = loginSaga(creds.badUser);
      gen.next(); // call api
      expect(gen.next(loginResponse.failure).value).toEqual(
        put({ type: "LOGIN_FAILURE", error: loginResponse.failure.error })
      );
    });
  });

  describe("logout action", () => {
    let gen;
    afterEach(() => {
      expect(gen.next().done).toBe(true);
    });
    it("should return a success message on logout", () => {
      gen = logoutSaga();
      gen.next();
      expect(gen.next(loginResponse.logut).value).toEqual(
        put({ type: "LOGOUT_SUCCESS" })
      );
    });
    it("should handle errors", () => {
      gen = logoutSaga();
      gen.next();
      expect(gen.throw(Error("Network Error")).value).toEqual(
        put({
          type: "LOGOUT_FAILURE",
          error: "Network Error"
        })
      );
    });
  });

  describe("register action", () => {
    let gen;
    afterEach(() => {
      expect(gen.next().done).toBe(true);
    });
    it("should return a userId on a successful registration", () => {
      gen = registerSaga({ info: registration.userInfo });
      expect(gen.next().value.type).toEqual("CALL"); // call api
      expect(gen.next(registerResponse.success).value).toEqual(
        put({
          type: "REGISTRATION_SUCCESS",
          user: registration.completeUser
        })
      );
    });

    it("should handle errors", async () => {
      const message = "Request failed with status code 404";
      gen = registerSaga(registration.unhandledInfo);
      gen.next(); // call api
      expect(gen.throw(Error(message)).value).toEqual(
        put({ type: "REGISTRATION_FAILURE", error: message })
      );
    });
  });
});

describe("integration", () => {
  let sagaStore;
  beforeEach(() => {
    sagaStore = new SagaTester({});
    sagaStore.start(authSaga);
    jest.setTimeout(1000);
  });

  describe("login", () => {
    it("can log in successfully", async () => {
      sagaStore.dispatch(login(creds.success));
      await sagaStore.waitFor("LOGIN_SUCCESS");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.login.success.start,
        actions.login.success.resolve
      ]);
    });

    it("returns a failure action with an error message for invalid credentials", async () => {
      sagaStore.dispatch(login(creds.badUser));
      await sagaStore.waitFor("LOGIN_FAILURE");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.login.failure.start,
        actions.login.failure.resolve
      ]);
    });
  });

  describe("registration", () => {
    it("can register successfully", async () => {
      sagaStore.dispatch(register(registration.userInfo));
      await sagaStore.waitFor("REGISTRATION_SUCCESS");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.registration.success.start,
        actions.registration.success.resolve
      ]);
    });

    it("returns an failure for an existing username", async () => {
      sagaStore.dispatch(register(registration.badUserInfo));
      await sagaStore.waitFor("REGISTRATION_FAILURE");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.registration.badUser.start,
        actions.registration.badUser.resolve
      ]);
    });
    it("returns an failure for other errors", async () => {
      sagaStore.dispatch(register(registration.unhandledInfo));
      await sagaStore.waitFor("REGISTRATION_FAILURE");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.registration.unhandledError.start,
        actions.registration.unhandledError.resolve
      ]);
    });
  });

  describe("logout", () => {
    it("can log out", async () => {
      sagaStore.dispatch(logout());
      await sagaStore.waitFor("LOGOUT_SUCCESS");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.logout.start,
        actions.logout.success
      ]);
    });

    it("handles logout errors", async () => {
      mock.resetHandlers();
      mock.onGet(ApiUrls.logout).networkErrorOnce();
      sagaStore.dispatch(logout());
      await sagaStore.waitFor("LOGOUT_FAILURE");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.logout.start,
        actions.logout.failure
      ]);
      setupMockAdapter();
    });
  });
});

import authReducer, { initialState } from "../src/redux/reducers/authReducer";

describe("authReducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });
  describe("login", () => {
    const loginStartedState = authReducer(
      undefined,
      actions.login.success.start
    );
    it("should set the loading flag when starting", () => {
      expect(loginStartedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });
    it("should set the user on success", () => {
      expect(
        authReducer(loginStartedState, actions.login.success.resolve)
      ).toEqual({
        ...loginStartedState,
        user: loginResponse.success,
        isLoading: false
      });
    });
    it("should set the error on an error", () => {
      expect(
        authReducer(loginStartedState, actions.login.failure.resolve)
      ).toEqual({
        ...loginStartedState,
        error: loginResponse.failure.error,
        isLoading: false
      });
    });
  });
  describe("register", () => {
    const registrationStartedState = authReducer(
      undefined,
      actions.registration.success.start
    );
    it("should set the loading flag when starting", () => {
      expect(registrationStartedState).toEqual({
        ...initialState,
        isLoading: true
      });
    });
    it("should set the user on success", () => {
      expect(
        authReducer(
          registrationStartedState,
          actions.registration.success.resolve
        )
      ).toEqual({
        ...registrationStartedState,
        user: registration.completeUser,
        isLoading: false
      });
    });
    it("should set the error on an error", () => {
      expect(
        authReducer(
          registrationStartedState,
          actions.registration.badUser.resolve
        )
      ).toEqual({
        ...registrationStartedState,
        error: registerResponse.usernameError.message,
        isLoading: false
      });
    });
  });

  describe("logout", () => {
    const preLogoutState = authReducer(
      undefined,
      actions.login.success.resolve
    );
    expect(preLogoutState.user).toBeTruthy;
    const logoutStartedState = authReducer(
      preLogoutState,
      actions.logout.start
    );
    it("should set the loading flag when starting", () => {
      expect(logoutStartedState).toEqual({
        ...preLogoutState,
        isLoading: true
      });
    });
    it("should set the user to null on success", () => {
      expect(authReducer(logoutStartedState, actions.logout.success)).toEqual({
        ...logoutStartedState,
        user: null,
        isLoading: false
      });
    });
    it("should set the error on an error", () => {
      expect(authReducer(logoutStartedState, actions.logout.failure)).toEqual({
        ...logoutStartedState,
        error: "Network Error",
        isLoading: false
      });
    });
  });
});

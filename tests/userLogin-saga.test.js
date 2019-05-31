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
    .reply(200, loginResponse.invalidUsername)
    .onGet(ApiUrls.login, { params: creds.badPw })
    .reply(200, loginResponse.incorrectPassword)
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
    it("should return success for valid login credentials", async () => {
      let res = await loginWithApi(creds.success);
      expect(res).toEqual(loginResponse.success);
    });

    it("should return an error for an invalid user", async () => {
      try {
        await loginWithApi(creds.badUser);
      } catch (error) {
        expect(error).toEqual(loginResponse.usernameError);
      }
    });

    it("should return an error for an invalid password", async () => {
      try {
        await loginWithApi(creds.badPw);
      } catch (error) {
        expect(error).toEqual(loginResponse.passwordError);
      }
    });

    xit("should return some other error for other reasons", () => {});
  });

  describe("logout api call", () => {
    afterAll(() => {
      setupMockAdapter();
    });
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
      } catch (error) {
        expect(error).toEqual(Error("Network Error"));
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

    it("should return a user object on a successful login", () => {
      gen = loginSaga(creds.success);
      gen.next(); // call api
      expect(gen.next(loginResponse.success).value).toEqual(
        put({ type: "LOGIN_SUCCESS", user: loginResponse.success.data })
      );
    });

    it("should return an error when passed an invalid username", () => {
      gen = loginSaga(creds.badUser);
      gen.next(); // call api
      expect(gen.throw(loginResponse.usernameError).value).toEqual(
        put({ type: "LOGIN_FAILURE", error: "Invalid Username" })
      );
    });

    it("should return an error when passed an invalid password", () => {
      gen = loginSaga(creds.badPw);
      gen.next(); // call api
      expect(gen.throw(loginResponse.passwordError).value).toEqual(
        put({ type: "LOGIN_FAILURE", error: "Incorrect Password" })
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
    xit("should handle errors", () => {});
  });

  describe("register action", () => {
    let gen;
    afterEach(() => {
      expect(gen.next().done).toBe(true);
    });
    it("should return a userId on a successful registration", () => {
      gen = registerSaga(registration.userInfo);
      expect(gen.next().value.type).toEqual("CALL"); // call api
      expect(gen.next(registerResponse.success).value).toEqual(
        put({
          type: "REGISTRATION_SUCCESS",
          userId: registerResponse.success.user_id
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

    it("returns an failure for an invalid username", async () => {
      sagaStore.dispatch(login(creds.badUser));
      await sagaStore.waitFor("LOGIN_FAILURE");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.login.badUser.start,
        actions.login.badUser.resolve
      ]);
    });

    it("returns an failure for an invalid password", async () => {
      sagaStore.dispatch(login(creds.badPw));
      await sagaStore.waitFor("LOGIN_FAILURE");
      expect(sagaStore.getCalledActions()).toEqual([
        actions.login.badPw.start,
        actions.login.badPw.resolve
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

    xit("handles logout errors", () => {});
  });
});

SagaTester.prototype.wait = function(timeout, actionType, futureOnly) {
  function doTimeout(timeout) {
    return new Promise(function(resolve, reject) {
      setTimeout(
        reject,
        timeout - 100,
        `Timed out waiting for action ${actionType} to be dispatched from saga`
      );
    });
  }

  return Promise.race([
    doTimeout(timeout),
    this.waitFor(actionType, futureOnly)
  ]);
};

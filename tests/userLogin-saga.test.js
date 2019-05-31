import { put, call } from "redux-saga/effects";
import {
  login,
  loginSaga,
  loginWithApi,
  logoutWithApi,
  logoutSaga,
  registerSaga,
  registerWithApi,
  ApiUrls
} from "../src/redux/actions/authActions";
import {
  loginResponse,
  registerResponse,
  creds,
  params,
  actions
} from "./__mocks__/loginResponse";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SagaTester from "redux-saga-tester";

function setupMockAdapter() {
  mock = new MockAdapter(axios);
  mock
    .onGet(ApiUrls.nonce)
    .reply(200, registerResponse.nonce)
    .onGet(ApiUrls.register, { params: params.registerApi })
    .replyOnce(200, registerResponse.success)
    .onGet(ApiUrls.register, { params: params.registerApi })
    .replyOnce(200, registerResponse.usernameTaken)
    .onGet(ApiUrls.login, { params: creds.success })
    .reply(200, loginResponse.success)
    .onGet(ApiUrls.login, { params: creds.badUser })
    .reply(200, loginResponse.invalidUsername)
    .onGet(ApiUrls.login, { params: creds.badPw })
    .reply(200, loginResponse.incorrectPassword)
    .onGet(ApiUrls.logout)
    .reply(200, loginResponse.logout);
}
let mock;
setupMockAdapter();

describe("API Calls", () => {
  describe("register api call", () => {
    it("should return a user upon successful registration", async () => {
      let res = await registerWithApi(params.registerArgs);
      expect(res).toEqual(registerResponse.success);
    });

    it("should return an error when passed a username that already exists", async () => {
      let res = await registerWithApi({
        username: params.registerApi.username,
        email: params.registerApi.email,
        password: params.registerApi.user_pass
      });
      expect(res).toEqual(registerResponse.usernameTaken);
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
    it("should return a logout message when successful", async () => {
      let res = await logoutWithApi();
      expect(res).toEqual(loginResponse.logout);
    });

    xit("should handle errors", () => {});
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
      gen = registerSaga(params.registerArgs);
      expect(gen.next().value.type).toEqual("CALL"); // call api
      expect(gen.next(registerResponse.success).value).toEqual(
        put({
          type: "REGISTRATION_SUCCESS",
          userId: registerResponse.success.user_id
        })
      );
    });

    xit("should handle errors", () => {});
  });
});

import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import authSaga from "../src/redux/actions/authActions";

xdescribe("reducer integration", () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureMockStore([sagaMiddleware]);
  // let store = mockStore({});
  // sagaMiddleware.run(authSaga);
  afterEach(() => {
    // store.clearActions();
  });
  it("can log in successfully", () => {
    let store = mockStore({});
    sagaMiddleware.run(authSaga);
    const expectedActions = [actions.startSuccess, actions.loginSuccess];
    let unsubscribe = store.subscribe(() => {
      const received = store.getActions();
      console.log(received.map(a => a.type));
      if (received.length >= expectedActions.length) {
        expect(received).toEqual(expectedActions);
      }
      // if (received.includes(expectedActions.splice(-1))) unsubscribe();
    });
    store.dispatch(login(creds.success));
  });

  it("gives an error on an invalid login", () => {
    let store = mockStore({});
    sagaMiddleware.run(authSaga);
    const expectedActions = [actions.startBadUser, actions.loginBadUser];

    let unsubscribe = store.subscribe(() => {
      const received = store.getActions();

      console.log(received.map(a => a.type));
      if (received.length >= expectedActions.length) {
        expect(received).toEqual(expectedActions);
      }
      // if (received.includes(expectedActions.splice(-1))) unsubscribe();
    });
    store.dispatch(login(creds.badUser));
  });
});

describe("integration", () => {
  let sagaStore;
  beforeEach(() => {
    sagaStore = new SagaTester({});
    sagaStore.start(authSaga);
    jest.setTimeout(1000);
  });
  it("can log in successfully", async () => {
    sagaStore.dispatch(login(creds.success));
    try {
      await sagaStore.waitFor("LOGIN_SUCCESS");
      // await setTimeout(() => {}, 5000);
    } catch (error) {
      console.log(error);
    }
    expect(sagaStore.getCalledActions()).toEqual([
      actions.startSuccess,
      actions.loginSuccess
    ]);
  });

  it("returns an error for an invalid username", async () => {
    sagaStore.dispatch(login(creds.badUser));
    try {
      await sagaStore.waitFor("LOGIN_FAILURE");
    } catch (error) {
      console.log(error);
    }
    expect(sagaStore.getCalledActions()).toEqual([
      actions.startBadUser,
      actions.loginBadUser
    ]);
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

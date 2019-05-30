import { put } from "redux-saga/effects";
import {
  loginSaga,
  loginWithApi,
  logoutWithApi,
  logoutSaga,
  registerSaga,
  registerWithApi,
  ApiUrls
} from "../src/redux/actions/authActions";
import { loginResponse, registerResponse } from "./__mocks__/loginResponse";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const success = {
  creds: { username: "testuser1", password: "123123" }
};
const badUser = {
  creds: { username: "xxx", password: "123123" }
};
const badPw = {
  creds: { username: "testuser1", password: "1231230" }
};
const registerApiParams = {
  nonce: "29a63be176",
  username: "testuser1",
  email: "api1@bolt.com",
  display_name: "testuser1",
  user_pass: "123123"
};
const registerArguments = {
  username: registerApiParams.username,
  email: registerApiParams.email,
  password: registerApiParams.user_pass
};
describe("API Calls", () => {
  describe("register api call", () => {
    let mock;
    beforeAll(() => {
      mock = new MockAdapter(axios);
    });
    afterAll(() => {
      mock.restore();
    });
    it("should return a user upon successful registration", async () => {
      mock
        .onGet(ApiUrls.nonce)
        .reply(200, registerResponse.nonce)
        .onGet(ApiUrls.register, { params: registerApiParams })
        .replyOnce(200, registerResponse.success);
      let res = await registerWithApi(registerArguments);
      expect(res).toEqual(registerResponse.success);
    });

    it("should return an error when passed a username that already exists", async () => {
      mock
        .onGet(ApiUrls.nonce)
        .reply(200, registerResponse.nonce)
        .onGet(ApiUrls.register, { params: registerApiParams })
        .replyOnce(200, registerResponse.usernameTaken);
      let res = await registerWithApi({
        username: registerApiParams.username,
        email: registerApiParams.email,
        password: registerApiParams.user_pass
      });
      expect(res).toEqual(registerResponse.usernameTaken);
    });

    xit("should give a special alert when it receives an HTML response, indicating that the JSON APIs have been disabled", () => {});
  });

  describe("login api call", () => {
    beforeAll(() => {
      let mock = new MockAdapter(axios);
      mock
        .onGet(ApiUrls.login, { params: success.creds })
        .reply(200, loginResponse.success)
        .onGet(ApiUrls.login, { params: badUser.creds })
        .reply(200, loginResponse.invalidUsername)
        .onGet(ApiUrls.login, { params: badPw.creds })
        .reply(200, loginResponse.incorrectPassword);
    });
    afterAll(() => {
      mock.restore();
    });

    it("should return success for valid login credentials", async () => {
      let res = await loginWithApi(success.creds);
      expect(res).toEqual(loginResponse.success);
    });

    it("should return an error for an invalid user", async () => {
      let res = await loginWithApi(badUser.creds);
      expect(res).toEqual(loginResponse.usernameError);
    });

    it("should return an error for an invalid password", async () => {
      let res = await loginWithApi(badPw.creds);
      expect(res).toEqual(loginResponse.passwordError);
    });

    xit("should return some other error for other reasons", () => {});
  });

  describe("logout api call", () => {
    let mock;
    beforeAll(() => {
      let mock = new MockAdapter(axios);
      mock.onGet(ApiUrls.logout).reply(200, loginResponse.logout);
    });
    afterAll(() => {
      mock.restore();
    });

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
      gen = loginSaga(success.creds);
      gen.next(); // call api
      expect(gen.next(loginResponse.success).value).toEqual(
        put({ type: "LOGIN_SUCCESS", user: loginResponse.success.data })
      );
    });

    it("should return an error when passed an invalid username", () => {
      gen = loginSaga(badUser.creds);
      gen.next(); // call api
      expect(gen.next(loginResponse.usernameError).value).toEqual(
        put({ type: "LOGIN_FAILURE", error: "Invalid Username" })
      );
    });

    it("should return an error when passed an invalid password", () => {
      gen = loginSaga(badPw.creds);
      gen.next(); // call api
      expect(gen.next(loginResponse.passwordError).value).toEqual(
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
      gen = registerSaga(registerArguments);
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

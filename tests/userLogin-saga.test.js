import { put } from "redux-saga/effects";
import {
  loginSaga,
  loginWithApi,
  logoutWithApi,
  logoutSaga,
  registerWithApi,
  ApiUrls
} from "../src/redux/actions/authActions";
import mockResponse, { registerResponse } from "./__mocks__/loginResponse";

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

describe("API Calls", () => {
  describe("register api call", () => {
    let mock, registerParams;
    beforeAll(() => {
      mock = new MockAdapter(axios);
      registerParams = {
        nonce: "29a63be176",
        username: "testuser1",
        email: "api1@bolt.com",
        display_name: "testuser1",
        user_pass: "123123"
      };
    });
    afterAll(() => {
      mock.restore();
    });
    it("should return a user upon successful registration", async () => {
      mock
        .onGet(ApiUrls.nonce)
        .reply(200, registerResponse.nonce)
        .onGet(ApiUrls.register, { params: registerParams })
        .replyOnce(200, registerResponse.success);
      let res = await registerWithApi({
        username: registerParams.username,
        email: registerParams.email,
        password: registerParams.user_pass
      });
      expect(res).toEqual(registerResponse.success);
    });

    it("should return an error when passed a username that already exists", async () => {
      mock
        .onGet(ApiUrls.nonce)
        .reply(200, registerResponse.nonce)
        .onGet(ApiUrls.register, { params: registerParams })
        .replyOnce(200, registerResponse.usernameTaken);
      let res = await registerWithApi({
        username: registerParams.username,
        email: registerParams.email,
        password: registerParams.user_pass
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
        .reply(200, mockResponse.success);
      mock
        .onGet(ApiUrls.login, { params: badUser.creds })
        .reply(200, mockResponse.invalidUsername);
      mock
        .onGet(ApiUrls.login, { params: badPw.creds })
        .reply(200, mockResponse.invalidPassword);
    });
    afterAll(() => {
      mock.restore();
    });

    it("should return success for valid login credentials", async () => {
      let res = await loginWithApi(success.creds);
      expect(res).toEqual(mockResponse.success);
    });

    it("should return an error for an invalid user", async () => {
      let res = await loginWithApi(badUser.creds);
      expect(res).toEqual(mockResponse.invalidUsername);
    });

    it("should return an error for an invalid password", async () => {
      let res = await loginWithApi(badPw.creds);
      expect(res).toEqual(mockResponse.invalidPassword);
    });

    xit("should return some other error for other reasons", () => {});
  });

  describe("logout api call", () => {
    let mock;
    beforeAll(() => {
      let mock = new MockAdapter(axios);
      mock.onGet(ApiUrls.logout).reply(200, mockResponse.logout);
    });
    afterAll(() => {
      mock.restore();
    });

    it("should return a logout message when successful", async () => {
      let res = await logoutWithApi();
      expect(res).toEqual(mockResponse.logout);
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
      expect(gen.next(mockResponse.success).value).toEqual(
        put({ type: "LOGIN_SUCCESS", user: mockResponse.success.data })
      );
    });

    it("should return an error when passed an invalid username", () => {
      gen = loginSaga(badUser.creds);
      gen.next(); // call api
      expect(gen.next(mockResponse.invalidUsername).value).toEqual(
        put({ type: "LOGIN_FAILURE", error: "Invalid Username" })
      );
    });

    it("should return an error when passed an invalid password", () => {
      gen = loginSaga(badPw.creds);
      gen.next(); // call api
      expect(gen.next(mockResponse.invalidPassword).value).toEqual(
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
      gen.next(); // call api
      expect(gen.next(mockResponse.logut).value).toEqual(
        put({ type: "LOGOUT_SUCCESS" })
      );
    });
  });
});

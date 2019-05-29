import { put } from "redux-saga/effects";
import {
  loginSaga,
  loginWithApi,
  ApiUrls
} from "../src/redux/actions/authActions";
import mockResponse from "./__mocks__/loginResponse";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const success = {
  url: ApiUrls.login + "?username=testuser1&password=123123",
  creds: { username: "testuser1", password: "123123" }
};
const badUser = {
  url: success.url.replace("testuser", "xxx"),
  creds: { username: "xxx", password: "123123" }
};
const badPw = {
  url: success.url + "0",
  creds: { username: "testuser1", password: "1231230" }
};

describe("login api call", () => {
  let mock;
  beforeAll(() => {
    mock = new MockAdapter(axios);
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
});

describe("user login", () => {
  let gen;
  afterEach(() => {
    expect(gen.next().done).toBe(true);
  });

  it("should return a user object on a successful login", () => {
    gen = loginSaga(success.creds);
    gen.next();
    expect(gen.next(mockResponse.success).value).toEqual(
      put({ type: "LOGIN_SUCCESS", user: mockResponse.success.data })
    );
  });

  it("should return an error when passed an invalid username", () => {
    gen = loginSaga(badUser.creds);
    gen.next();
    expect(gen.next(mockResponse.invalidUsername).value).toEqual(
      put({ type: "LOGIN_FAILURE", error: "Invalid Username" })
    );
    expect(gen.next().done).toBe(true);
  });
  it("should return an error when passed an invalid password", () => {
    gen = loginSaga(badPw.creds);
    gen.next();
    expect(gen.next(mockResponse.invalidPassword).value).toEqual(
      put({ type: "LOGIN_FAILURE", error: "Incorrect Password" })
    );
    expect(gen.next().done).toBe(true);
  });
});

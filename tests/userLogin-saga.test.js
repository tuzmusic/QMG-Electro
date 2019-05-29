import { put, take } from "redux-saga/effects";
// import { cloneableGenerator } from "@redux-saga/testing-utils";

import { loginSaga, ApiUrls } from "../src/redux/actions/authActions";
import mockResponse from "./__mocks__/loginResponse";
import fetchMock from "fetch-mock";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// const gen = loginSaga();
success = {
  url: ApiUrls.Login + "?username=testuser1&password=123123",
  creds: { username: "testuser1", password: "123123" }
};
badUser = {
  url: success.url.replace("testuser", "xxx"),
  creds: { username: "xxx", password: "123123" }
};
badPw = {
  url: success.url + "0",
  creds: { username: "testuser1", password: "1231230" }
};

describe("user login", () => {
  it("should return a user object on a successful login", () => {
    let gen = loginSaga(success.creds);
    expect(gen.next().value.type).toEqual("CALL");
    expect(gen.next(mockResponse.success).value).toEqual(
      put({ type: "LOGIN_SUCCESS", user: mockResponse.success.data })
    );
    expect(gen.next().done).toBe(true);
  });

  it("should return an error when passed an invalid username", () => {
    let gen = loginSaga(badUser.creds);
    expect(gen.next().value.type).toEqual("CALL");
    expect(gen.next(mockResponse.invalidUsername).value).toEqual(
      put({ type: "LOGIN_FAILURE", error: "invalid_username" })
    );
    expect(gen.next().done).toBe(true);
  });
});

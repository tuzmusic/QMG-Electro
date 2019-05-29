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
  const gen = loginSaga(success.creds);
  // console.log(gen.next());
  // console.log(gen.next());
  // console.log(gen.next());

  const mock = new MockAdapter(axios);
  it("should return a user object on a successful login", () => {
    mock.onGet(success.url).reply(200, mockResponse.success);
    expect(gen.next().value.type).toEqual("CALL");
    expect(gen.next(mockResponse.success).value).toEqual(
      put({ type: "LOGIN_SUCCESS", user: mockResponse.success })
    );
  });
});

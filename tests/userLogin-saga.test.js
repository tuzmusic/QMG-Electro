import { put } from "redux-saga/effects";
import { loginSaga, ApiUrls } from "../src/redux/actions/authActions";
import mockResponse from "./__mocks__/loginResponse";

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

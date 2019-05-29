import { put, takeEvery } from "redux-saga/effects";
import { loginSaga } from "../src/redux/actions/authActions";

describe("user login", () => {
  const saga = loginSaga();
  it("should kick off a login with a LOGIN_START action", () => {
    expect(saga.next().value).toEqual(put({ type: "LOGIN_END" }));
  });

  // it('should return a user object on a successful login', () => {
  // });
});

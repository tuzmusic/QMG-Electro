import { login, ApiUrls } from "../src/redux/actions/authActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

const mockStore = configureMockStore([thunk]);
let store = mockStore({ auth: { user: null } });
const successUrl = ApiUrls.Login + "?username=testuser1&password=123123";
const badUserUrl = successUrl.replace("testuser", "xxx");
const badPwUrl = successUrl + "0";

describe("user login", () => {
  beforeEach(() => {});
  afterEach(() => {
    store = mockStore({ user: null });
    fetchMock.restore();
  });
  const expectedActions = {
    start: { type: "LOGIN_START" },
    success: { type: "LOGIN_SUCCESS", user: mockResponse.success.data }
  };
  it("returns user info when correctly logging in in a registered user", async () => {
    fetchMock.mock(successUrl, mockResponse.success);
    await store.dispatch(login({ username: "testuser1", password: "123123" }));
    expect(store.getActions()).toEqual(
      expect.arrayContaining([expectedActions.start, expectedActions.success])
    );
  });

  it("returns an error message when given invalid username", async () => {
    fetchMock.mock(badUserUrl, mockResponse.invalidUsername);
    await store.dispatch(login({ username: "testuser1x", password: "123123" }));
  });
  it("returns an error message when given incorrect password", async () => {
    fetchMock.mock(badPwUrl, mockResponse.incorrectPassword);
    await store.dispatch(login({ username: "testuser1x", password: "123123" }));
  });
});

const mockResponse = {
  success: {
    data: {
      ID: "6",
      user_login: "testuser1",
      user_pass: "$P$BC5js71iidxI4lycappjRcMLowKhld/",
      user_nicename: "testuser1",
      user_email: "testuser@bolt.com",
      user_url: "",
      user_registered: "2019-05-28 20:11:49",
      user_activation_key: "",
      user_status: "0",
      display_name: "testuser1"
    },
    ID: 6,
    caps: {
      subscriber: true
    }
  },
  incorrectPassword: {
    code: "incorrect_password",
    message:
      '<strong>ERROR</strong>: The password you entered for the username <strong>testuser1</strong> is incorrect. <a href="http://joinelectro.com/wp-login.php?action=lostpassword">Lost your password?</a>',
    data: null
  },
  invalidUsername: {
    code: "invalid_username",
    message:
      '<strong>ERROR</strong>: Invalid username. <a href="http://joinelectro.com/wp-login.php?action=lostpassword">Lost your password?</a>',
    data: null
  }
};

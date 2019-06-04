import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiUrls } from "../../src/redux/actions/authActions";
import {
  loginResponse,
  registerResponse,
  creds,
  registration
} from "./loginResponse";

export function setupAuthMockAdapter() {
  let mock = new MockAdapter(axios);
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
    .reply(200, loginResponse.failure)
    // logout
    .onGet(ApiUrls.logout)
    .reply(200, loginResponse.logout);
  return mock;
}

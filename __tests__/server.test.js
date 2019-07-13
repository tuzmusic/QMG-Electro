import axios from "axios";
import { ApiUrls } from "../src/redux/actions/authActions";

describe("authentication server", () => {
  let nonce = null;
  it("returns a nonce on request", async () => {
    nonce = (await axios.get(ApiUrls.nonce)).data.nonce;
    expect(nonce).toBeDefined;
  });

  describe("allows registration", () => {
    it("returns an error when using a nonce to register with an existing username", async () => {
      const res = await axios.get(ApiUrls.register, {
        params: {
          username: "testuser1",
          email: "testuser1@electro.com",
          nonce,
          display_name: "testuser1",
          user_pass: "123123"
        }
      });

      expect(res.data.error).toEqual(
        "User registration is disabled. Please enable it in Settings > Gereral."
      );
    });
  });

  describe("allows login", () => {
    it("can log in successfully", async () => {
      const res = await axios.get(ApiUrls.login, {
        params: {
          username: "testuser1",
          password: "123123"
        }
      });
      expect(res.data.cookie).toBeDefined;
    });
  });
});

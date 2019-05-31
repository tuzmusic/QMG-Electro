export const loginResponse = {
  logout: "User was logged out.",
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
  passwordError: Error("Incorrect Password"),
  invalidUsername: {
    code: "invalid_username",
    message:
      '<strong>ERROR</strong>: Invalid username. <a href="http://joinelectro.com/wp-login.php?action=lostpassword">Lost your password?</a>',
    data: null
  },
  usernameError: Error("Invalid Username")
};

export const registerResponse = {
  nonce: {
    status: "ok",
    controller: "user",
    method: "register",
    nonce: "29a63be176"
  },
  success: {
    status: "ok",
    cookie:
      "apitestuser1|1560382602|w8L8JuhcMIAk8h5bwRmhOjVmPnNjbgNZJmBd7bcFUsL|542260b66fa2080175d9315f2a5bf3486dd174c7483913c46a2658a8d75637c1",
    user_id: 9
  },
  usernameTaken: {
    status: "error",
    error: "Username already exists."
  }
};

export const creds = {
  success: {
    username: "testuser1",
    password: "123123"
  },
  badUser: {
    username: "xxx",
    password: "123123"
  },
  badPw: {
    username: "testuser1",
    password: "1231230"
  }
};

const mainParams = {
  nonce: "29a63be176",
  username: "testuser1",
  email: "api1@bolt.com",
  display_name: "testuser1",
  user_pass: "123123"
};
const mainCreds = {
  username: "testuser1",
  email: "api1@bolt.com",
  password: "123123"
};

export const params = {
  registerApi: {
    username: mainCreds.username,
    email: mainCreds.email,
    nonce: "29a63be176",
    display_name: mainCreds.username,
    user_pass: mainCreds.password
  },
  loginArgs: { username: mainParams.username, password: mainParams.password },
  loginSagaArgs: {
    type: "LOGIN_START",
    creds: { username: mainParams.username, password: mainParams.password }
  },
  registerArgs: {
    username: mainParams.username,
    email: mainParams.email,
    password: mainParams.user_pass
  },
  registerSagaArgs: {
    registere: "LOGIN_START",
    creds: { username: mainParams.username, password: mainParams.password }
  }
};

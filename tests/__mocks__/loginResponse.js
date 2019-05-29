export default {
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
  invalidPassword: {
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

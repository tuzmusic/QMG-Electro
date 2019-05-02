import React, { Component } from "react";
import {
  Image,
  Input,
  Button,
  ThemeProvider,
  Overlay
} from "react-native-elements";
import { View, Text, Picker } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { login, assignUser } from "../redux/actions/authActions";
import F8StyleSheet from "../components/F8StyleSheet";
import { Dropdown } from "react-native-material-dropdown";
import User from "../models/User";

class LoginView extends Component {
  state = {
    username: "",
    selectedUserId: null,
    password: "",
    isLoading: false,
    usernameError: ""
  };

  async performLogin(user) {
    await this.props.assignUser(user);
    this.props.navigation.navigate("Main");
  }

  async handleLogin() {
    let user;
    if ((id = this.state.selectedUserId)) {
      user = this.props.users[id];
    } else if ((username = this.state.username)) {
      const currentUsernames = Object.values(this.props.users).map(
        u => u.username
      );
      if (currentUsernames.indexOf(username) > -1) {
        await this.setState({ usernameError: "This user already exists" });
        return;
      }
      user = new User({ username });
    }
    if (user) {
      await this.setState({ isLoading: true });
      this.performLogin(user);
    }
  }

  selectDropdown(id) {
    this.setState({ selectedUserId: id, username: "", usernameError: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <Overlay
          containerStyle={styles.modal}
          height={200}
          width={200}
          isVisible={this.state.isLoading}
          style={styles.modal}
          borderRadius={20}
          overlayBackgroundColor={"lightblue"}
        >
          <View style={styles.modalContainer}>
            <DotIndicator color={"darkgrey"} />
            <Text>Logging in...</Text>
          </View>
        </Overlay>

        <ThemeProvider theme={theme}>
          <Image
            source={require("../../assets/logos/ElectroLogo.png")}
            style={styles.image}
          />
          <Dropdown
            value={this.props.users[this.state.selectedUserId]?.username || ""}
            onChangeText={this.selectDropdown.bind(this)}
            label="Select User"
            data={this.props.dropdownUsers}
            containerStyle={{ width: "100%", padding: 10 }}
          />
          <Input
            placeholder="Username"
            label={"Or Create New User"}
            value={this.state.username}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={username => {
              this.setState({ username, selectedUserId: null, usernameError: "" });
            }}
            errorMessage={this.state.usernameError}
          />
          <Button title="Login" onPress={this.handleLogin.bind(this)} />
        </ThemeProvider>
      </View>
    );
  }
}

function dropdownFriendlyUsers(users) {
  return Object.entries(users).map(([id, user]) => {
    return {
      label: user.username,
      value: id
    };
  });
}

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    users: state.auth.users,
    dropdownUsers: dropdownFriendlyUsers(state.auth.users),
    error: state.auth.error
  }),
  { login, assignUser }
)(LoginView);

const theme = {
  Input: {
    containerStyle: {
      padding: 10
    }
  },
  Button: {
    containerStyle: {
      padding: 30,
      width: "100%"
    }
  }
};

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 40
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 40
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

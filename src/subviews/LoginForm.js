import React, { Component } from "react";
import {
  Image,
  Input,
  Button,
  ThemeProvider,
  Overlay
} from "react-native-elements";
import { View, Text, Picker, TouchableOpacity } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { login, assignUser } from "../redux/actions/authActions";
import F8StyleSheet from "../components/F8StyleSheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import User from "../models/User";
import uuid from "react-native-uuid";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.props.error && (
          <Text style={styles.errorText}>{this.props.error}</Text>
        )}
        <Input
          placeholder="Username"
          label={this.state.username && "Username"}
          value={this.state.username}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={username => {
            this.setState({ username });
          }}
        />
        <Input
          placeholder="Password"
          label={this.state.password && "Password"}
          secureTextEntry
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={password => {
            this.setState({ password });
          }}
        />
        <Button
          title="Login"
          disabled={this.props.isLoading}
          onPress={() => this.props.onLogin(this.state)}
        />
        <TouchableOpacity onPress={() => console.log("click")}>
          <Text style={{ fontSize: 16 }}>
            Don't have an account? <Text style={styles.link}>Click here</Text>{" "}
            to register.
          </Text>
        </TouchableOpacity>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    error: state.auth.error
  }),
  { login, assignUser }
)(LoginForm);

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
  },
  Text: {
    style: {
      fontSize: 16
    }
  }
};

const styles = F8StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 16
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  superContainer: {
    flex: 1,
    justifyContent: "center"
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

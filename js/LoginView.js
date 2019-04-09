import React, { Component } from "react";
import { Input, Button, Image, ThemeProvider } from "react-native-elements";
import { View } from "react-native";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import F8StyleSheet from "./F8StyleSheet";

class LoginView extends Component {
  state = {
    username: "",
    password: ""
  };

  handleLogin() {
    this.props.login();
  }

  render() {
    console.log("isLoading =", this.props.isLoading);
  
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Input
            placeholder="Username"
            value={this.state.username}
            onChangeText={username => {
              this.setState({ username });
            }}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => {
              this.setState({ password });
            }}
          />
          <Button
            title="Login"
            onPress={this.handleLogin.bind(this)}
            loading={this.props.isLoading}
          />
        </ThemeProvider>
      </View>
    );
  }
}

export default connect(
  state => ({ isLoading: state.auth.isLoading }),
  { login }
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
      width: '100%'
    }
  }
};

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  }
});

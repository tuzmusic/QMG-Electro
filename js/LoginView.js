import React, { Component } from "react";
import { Input, Button, Image, ThemeProvider } from "react-native-elements";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import F8StyleSheet from "./F8StyleSheet";

class LoginView extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
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
          <Button title="Login" />
        </ThemeProvider>
      </View>
    );
  }
}

export default connect()(LoginView);

const theme = {
  Input: {
    containerStyle: {
      padding: 10
    }
  },
  Button: {
    containerStyle: {
      padding: 30
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

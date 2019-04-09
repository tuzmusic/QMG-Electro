import React, { Component } from "react";
import { Input, Button, ThemeProvider, Overlay } from "react-native-elements";
import { View, ActivityIndicator, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";
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
    return (
      <View style={styles.container}>
        <Overlay
          containerStyle={styles.modal}
          height={200}
          width={200}
          isVisible={this.props.isLoading || true}
          style={styles.modal}
          borderRadius={20}
        >
          <View style={styles.modalContainer}>
            <DotIndicator color={'darkgrey'}/>
            <Text>Logging in...</Text>
          </View>
        </Overlay>
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
      width: "100%"
    }
  }
};

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "lightblue"
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

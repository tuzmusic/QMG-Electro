import React, { Component } from "react";
import {
  Image,
  Input,
  Button,
  ThemeProvider,
  Overlay
} from "react-native-elements";
import { View, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { /* login, */ assignUser } from "../redux/actions/authActions";
import F8StyleSheet from "../components/F8StyleSheet";

class LoginView extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false
  };

  performLogin() {
    fetch("http://127.0.0.1:3000/users") // this will need to be a POST session (not a GET user)
      .then(res => res.json())
      .then(users => {
        console.log("Login succeeded");
        this.props.assignUser(users[0]);
        console.log("Navigating to main screen");
        this.props.navigation.navigate("Main");
      })
      .catch(error => {
        console.warn("login failed", error);
        this.setState({ isLoading: false });
      });
  }

  handleLogin() {
    this.setState({ isLoading: true }, this.performLogin);
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
            source={require("../../assets/logos/BOLTLogoTransparent.png")}
            style={styles.image}
          />
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
          <Button title="Login" onPress={this.handleLogin.bind(this)} />
        </ThemeProvider>
      </View>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    error: state.auth.error
  }),
  { /* login, */ assignUser }
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

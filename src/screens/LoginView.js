import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";
import { View, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { login, register, clearAuthError } from "../redux/actions/authActions";
import F8StyleSheet from "../components/F8StyleSheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";

class LoginView extends Component {
  state = {
    loggingIn: false,
    registering: true,
    errors: []
  };

  componentDidMount() {
    // autoLogin();
    function autoLogin() {
      setTimeout(() => {
        this.handleLogin();
      }, 500);
    }
  }

  async handleLogin({ username, password }) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!password) errors.push("Password required");

    if (errors.length) {
      this.props.clearAuthError();
      return this.setState({ errors });
    }

    await this.props.login({ username, password });
  }

  async handleRegister({ username, email, password, passwordConfirmation }) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!email) errors.push("Email required");
    if (!password) errors.push("Password required");
    if (password && !passwordConfirmation)
      errors.push("Please type your password twice");
    if (password && passwordConfirmation && password !== passwordConfirmation)
      errors.push("Passwords don't match");
    console.log("validation errors:", errors);

    this.props.clearAuthError();
    if (errors.length) {
      return this.setState({ errors });
    }
    await this.props.register({ username, email, password });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user) {
      this.props.navigation.navigate("Main");
    }
  }

  toggleForm() {
    this.setState({
      errors: [],
      loggingIn: !this.state.loggingIn,
      registering: !this.state.registering
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.superContainer}>
        <View style={styles.container}>
          <Overlay
            containerStyle={styles.modal}
            height={200}
            width={200}
            isVisible={this.props.isLoading}
            style={styles.modal}
            borderRadius={20}
            overlayBackgroundColor={"lightblue"}
          >
            <View style={styles.modalContainer}>
              <DotIndicator color={"darkgrey"} />
              <Text>Logging in...</Text>
            </View>
          </Overlay>
          <Image
            source={require("../../assets/logos/ElectroLogo.png")}
            style={styles.image}
          />

          {console.log("state errors in render:", this.state.errors)}
          {console.log("props errors in render:", this.props.errors)}
          {this.state.errors.map((e, i) => (
            <Text style={styles.errorText} key={i}>
              {e}
            </Text>
          ))}
          {!this.state.errors.length && (
            <Text style={styles.errorText}>{this.props.error}</Text>
          )}

          {this.state.loggingIn && (
            <LoginForm
              onSubmit={this.handleLogin.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          )}
          {this.state.registering && (
            <RegisterForm
              onSubmit={this.handleRegister.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    error: state.auth.error
  }),
  { login, register, clearAuthError }
)(LoginView);

const styles = F8StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 16
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

import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";
import { View, Text } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { login, register } from "../redux/actions/authActions";
import F8StyleSheet from "../components/F8StyleSheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";

class LoginView extends Component {
  state = {
    loggingIn: true,
    registering: false,
    error: ""
  };

  autoLogin() {
    setTimeout(() => {
      this.handleLogin();
    }, 500);
  }

  componentDidMount() {
    // this.autoLogin();
  }

  async handleLogin({ username, password }) {
    if (!username) {
      return this.setState({
        error: password ? "Username required" : "Username and Password required"
      });
    }
    if (!password) {
      return this.setState({ error: "Password required" });
    }
    await this.props.login({ username, password });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user) {
      this.props.navigation.navigate("Main");
    }
  }

  toggleForm() {
    this.setState({
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
          <Text style={styles.errorText}>
            {this.props.error || this.state.error}
          </Text>
          {this.state.loggingIn && (
            <LoginForm
              onSubmit={this.handleLogin.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ error: "" })}
            />
          )}
          {this.state.registering && (
            <RegisterForm
              onLogin={this.handleLogin.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ error: "" })}
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
  { login, register }
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

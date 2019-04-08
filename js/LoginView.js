import React, { Component } from "react";
import { Text, View, Input } from "react-native";
import { connect } from "react-redux";

export default class LoginView extends Component {
  render() {
    return (
      <View>
        <Text> Login Screen </Text>
      </View>
    );
  }
}

 connect()(LoginView)
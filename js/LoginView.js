import React, { Component } from "react";
import { Input, Button, Image } from "react-native-elements";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import F8StyleSheet from "./F8StyleSheet";

class LoginView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Input containerStyle={{ padding: 10 }} placeholder="Email" />
        <Input containerStyle={{ padding: 10 }} placeholder="Password" />
        <Button title='Login'/>
      </View>
    );
  }
}

export default connect()(LoginView);

styles = F8StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  }
});

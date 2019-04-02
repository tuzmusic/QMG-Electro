import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

export default class UserDetailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "User Detail"
  });

  render() {
    return (
      <View style={styles.container}>
        <Text> User Detail </Text>
      </View>
    );
  }
}

styles = F8StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

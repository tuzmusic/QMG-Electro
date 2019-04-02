import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";

export default class StationDetailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Station Detail"
  });

  render() {
    return (
      <View style={styles.container}>
        <Text> Station Detail </Text>
      </View>
    );
  }
}

styles = F8StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

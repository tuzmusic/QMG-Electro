import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

class CreateStationView extends Component {
  render() {
    return (
      <View>
        <Text> Create New Station </Text>
      </View>
    );
  }
}

export default connect()(CreateStationView)
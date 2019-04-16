import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";

function createControlledComponent(propName, placeholder) {
  return (
    <Input
      placeholder={placeholder || propName[0].toUpperCase() + propName.slice(1)}
      value={this.state[propName]}
      onChangeText={value => {
        this.setState({ [propName]: value });
      }}
    />
  );
}

class CreateStationView extends Component {

  state = {
    listingName: ''
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Stations"
  });

  render() {
    return (
      <View>
        <Text> Create New Station </Text>
        {createControlledComponent.call(this, 'listingName', 'Listing Name')}
      </View>
    );
  }
}

export default connect()(CreateStationView);

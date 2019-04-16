import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Sugar from "sugar";
Sugar.extend() 

function createControlledComponent(propName, placeholder) {
  return (
    <Input
      placeholder={placeholder || propName.titleize()}
      value={this.state[propName]}
      onChangeText={value => {
        this.setState({ [propName]: value });
      }}
    />
  );
}

class CreateStationView extends Component {
  state = {
    listingName: ""
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Stations"
  });

  render() {
    return (
      <View>
        <Text> Create New Station </Text>
        {createControlledComponent.call(this, "listingName")}
        {createControlledComponent.call(this, "priceFrom")}
        {createControlledComponent.call(this, "priceTo")}
      </View>
    );
  }
}

export default connect()(CreateStationView);

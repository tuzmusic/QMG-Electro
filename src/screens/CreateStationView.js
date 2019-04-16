import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Sugar from "sugar";
Sugar.extend();

function createControlledComponent(propName, placeholder) {
  return (
    <View style={styles.inputContainer}>
      <Input
        placeholder={placeholder || propName.titleize()}
        value={this.state[propName]}
        onChangeText={value => {
          this.setState({ [propName]: value });
        }}
      />
    </View>
  );
}

class CreateStationView extends Component {
  state = {
    name: "",
    description: "",
    priceFrom: "",
    priceTo: ""
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "New Station"
  });

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <View>
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Friendly:</Text>
          {createControlledComponent.call(this, "name")}
          {createControlledComponent.call(this, "description")}
        </View>
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Absent:</Text>
          {createControlledComponent.call(this, "priceFrom")}
          {createControlledComponent.call(this, "priceTo")}
        </View>
        <View style={[styles.textContainer, { padding: 20 }]}>
          <Button title="Submit" onPress={this.handleSubmit.bind(this)} />
        </View>
      </View>
    );
  }
}

export default connect()(CreateStationView);

const text = {
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  }
};

const styles = {
  inputContainer: {
    padding: 5
  },
  textContainer: {
    padding: 10,
    paddingTop: 20
  }
};

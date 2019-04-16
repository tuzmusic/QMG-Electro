import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import Sugar from "sugar";
Sugar.extend();

function ControlledInput(props) {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      <Input
        style={props.inputStyle}
        placeholder={props.placeholder || props.propName.titleize()}
        value={this.state[props.propName]}
        onChangeText={value => {
          this.setState({ [props.propName]: value });
        }}
        multiline={props.multiline}
        numberOfLines={5} // android only, eh?
      />
    </View>
  );
}

class CreateStationView extends Component {
  initialState = {
    name: "",
    description: "",
    priceFrom: "",
    priceTo: ""
  };

  state = this.initialState;

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "New Station"
  });

  handleSubmit = clear => {
    console.log(this.state);
    if (clear) this.setState(this.initialState);
  };

  render() {
    return (
      <View>
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Friendly:</Text>
          {ControlledInput.call(this, { propName: "name" })}
          {ControlledInput.call(this, {
            propName: "description",
            multiline: true,
            containerStyle: {
              height: 100,
              justifyContent: "flex-end"
            }
          })}
          {ControlledInput.call(this, { propName: "Address" })}
          {ControlledInput.call(this, { propName: "(Website)" })}
          {ControlledInput.call(this, { propName: "(Tagline)" })}
        </View>
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Absent:</Text>
          {ControlledInput.call(this, { propName: "priceFrom" })}
          {ControlledInput.call(this, { propName: "priceTo" })}
        </View>
        <View style={[styles.textContainer, { padding: 20 }]}>
          <Button title="Submit" onPress={this.handleSubmit.bind(this)} />
          <Button
            title="Submit & Clear"
            style={{ paddingTop: 15 }}
            onPress={this.handleSubmit.bind(this, true)}
          />
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

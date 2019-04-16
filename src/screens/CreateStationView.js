import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Input, Button, Divider } from "react-native-elements";
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
        onChangeText={
          props.onChangeText ||
          (value => {
            this.setState({ [props.propName]: value });
          })
        }
        keyboardType={props.keyboardType}
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
    "(website)": "",
    "(tagline)": "",
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
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Friendly:</Text>
          {ControlledInput.call(this, { propName: "title" })}
          {ControlledInput.call(this, { propName: "address" })}
          {ControlledInput.call(this, { propName: "(website)" })}
          {ControlledInput.call(this, { propName: "(tagline)" })}
          {ControlledInput.call(this, {
            propName: "description",
            multiline: true,
            containerStyle: {
              height: 100,
              justifyContent: "flex-end"
            }
          })}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textContainer}>
          <Text style={text.title}>
            API-Friendly, but Complicated, and not implemented yet:
          </Text>
          {ControlledInput.call(this, {
            propName: "Amenities",
            placeholder:
              "Amenities (this will have to be checkboxes or something)",
            multiline: true
          })}
          <Button
            style={styles.button}
            title="Upload Photo"
            onPress={() => {}}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Absent:</Text>
          <View style={styles.rowContainer}>
            {ControlledInput.call(this, {
              propName: "priceFrom",
              containerStyle: styles.rowElement,
              keyboardType: "numeric"
            })}
            {ControlledInput.call(this, {
              propName: "priceTo",
              containerStyle: styles.rowElement,
              keyboardType: "numeric"
            })}
          </View>
          {ControlledInput.call(this, { propName: "contactEmail" })}
          {ControlledInput.call(this, { propName: "contactPhone" })}
          {ControlledInput.call(this, { propName: "hours", placeholder: "Hours: if we want opening hours, it'll probably be its own screen since we need a line for every day", multiline: true })}
        </View>
        <Divider style={styles.divider} />

        <View style={[styles.textContainer]}>
          <Button
            title="Submit"
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
          />
          <Button
            title="Submit & Clear"
            style={styles.button}
            onPress={this.handleSubmit.bind(this, true)}
          />
        </View>
      </ScrollView>
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
  rowElement: {
    width: 150
  },
  rowContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  button: {
    padding: 15,
    paddingBottom: 0
  },
  inputContainer: {
    padding: 5
  },
  textContainer: {
    padding: 20
  },
  divider: {
    margin: 15,
    height: 4,
    borderRadius: 15,
    backgroundColor: "lightblue"
  }
};

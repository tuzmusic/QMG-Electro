import React, { Component } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Input, Button, Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
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
    // TO-DO: Fix issue where multiline inputs don't avoid the keyboard. See https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/227 (and others on Google, probably)
    return (
      <KeyboardAwareScrollView>
        <View style={styles.textContainer}>
          <Text style={text.title}>API-Friendly:</Text>
          <Text style={text.body}>
            NOTE: These fields are{" "}
            <Text style={{ fontStyle: "italic" }}>returned</Text> by the API but
            it's unconfirmed whether we can post to these fields. (We can't post
            anything yet anyway, period!)
          </Text>
          {ControlledInput.call(this, { propName: "title" })}
          {ControlledInput.call(this, { propName: "address" })}
          {ControlledInput.call(this, { propName: "(website)" })}
          {ControlledInput.call(this, { propName: "(tagline)" })}
          {ControlledInput.call(this, {
            propName: "description",
            multiline: false
            // containerStyle: {
            //   height: 100,
            //   justifyContent: "flex-end"
            // }
          })}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.textContainer}>
          <Text style={text.title}>
            API-Friendly, but Complicated, and not implemented yet:
          </Text>
          {ControlledInput.call(this, {
            propName: "Amenities",
            placeholder: "Amenities",
            multiline: false
          })}
          <Text style={text.note}>
            (this will have to be checkboxes or something)
          </Text>

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
          {ControlledInput.call(this, {
            propName: "contactEmail",
            keyboardType: "email-address"
          })}
          {ControlledInput.call(this, {
            propName: "contactPhone",
            keyboardType: "phone-pad"
          })}
          {ControlledInput.call(this, {
            propName: "hours",
            placeholder: "Hours",
            multiline: false
          })}
          <Text style={text.note}>
            if we want opening hours, it'll probably be its own screen since we
            need a line for every day
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={[styles.textContainer, {paddingTop: 0}]}>
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
      </KeyboardAwareScrollView>
    );
  }
}

export default connect()(CreateStationView);

const text = {
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  body: {
    fontSize: 15,
    textAlign: "center"
  },
  note: { textAlign: "center", fontStyle: "italic" }
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

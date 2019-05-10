import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { GoogleAPIKey } from "../../secrets";
import AppStyles from "../constants/Styles";
import _ from "lodash";

export default class AutoFillMapSearch extends Component {
  state = {
    address: "",
    addressPredictions: [],
    showPredictions: false
  };

  async handleAddressChange() {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleAPIKey}&input=${
      this.state.address
    }`;
    try {
      const result = await fetch(url);
      const json = await result.json();
      this.setState({ addressPredictions: json.predictions });
    } catch (err) {
      console.error(err);
    }
  }

  onChangeText = address => {
    this.setState(
      { address, showPredictions: true },
      _.debounce(this.handleAddressChange.bind(this), 800)
    );
  };

  render() {
    const predictions = this.state.addressPredictions.map(prediction => (
      <TouchableOpacity
        style={styles.prediction}
        key={prediction.id}
        // onPress={this.setAddress.bind(this, prediction)}
      >
        <Text style={text.prediction}>{prediction.description}</Text>
      </TouchableOpacity>
    ));

    return (
      <View>
        <TextInput
          onChangeText={this.onChangeText}
          value={this.state.address}
          style={[styles.input, this.props.style]}
          placeholder={"Search"}
          onBlur={() => this.setState({ showPredictions: false })}
        />
        <View style={styles.predictionsContainer}>
          {this.state.showPredictions ? predictions : null}
        </View>
      </View>
    );
  }
}

const text = {
  prediction: {
    fontWeight: '100'
  }
}
const styles = {
  input: {
    fontFamily: AppStyles.font,
    fontSize: 16
  },
  prediction: {
    padding: 4,
    paddingTop: 10,
    margin: 3,
    borderTopColor: "lightgrey",
    borderTopWidth: 0.5,
  },
  predictionsContainer: {
    borderTopWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -5
  }
};

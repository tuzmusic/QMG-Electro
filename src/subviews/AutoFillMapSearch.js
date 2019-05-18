//  @flow
import type { ElectroLocation } from "../../flowTypes";
import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { GoogleAPIKey } from "../../secrets";
import AppStyles from "../constants/Styles";
import _ from "lodash";
import { connect } from "react-redux";
import { setCurrentRegion } from "../redux/actions/locationActions";

// #region TYPES
type State = {
  address: string,
  addressPredictions: [],
  showPredictions: boolean
};

type Props = {
  setCurrentRegion: ElectroLocation => void,
  style: { [key: string]: {} },
  beforeOnPress?: () => void
};
// #endregion

export class AutoFillMapSearch extends Component<Props, State> {
  state: State = {
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

  onChangeText = (address: string) => {
    this.setState(
      { address, showPredictions: true },
      _.debounce(this.handleAddressChange.bind(this), 800)
    );
  };

  async setAddress(prediction: { [key: string]: string }) {
    this.setState({ address: prediction.description, showPredictions: false });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleAPIKey}&placeid=${
      prediction.place_id
    }&fields=geometry`;
    try {
      const result = await fetch(url);
      const json = await result.json();
      const location = json.result.geometry.location;
      this.props.setCurrentRegion({
        latitude: location.lat,
        longitude: location.lng,
        accuracy: 0.1,
        showMarker: true
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const predictions = this.state.addressPredictions.map(prediction => (
      <TouchableOpacity
        style={styles.prediction}
        key={prediction.id}
        onPress={() => {
          this.props.beforeOnPress();
          this.setAddress(prediction);
        }}
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
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          onBlur={() => {
            debugger;
            this.setState({ showPredictions: false });
          }}
        />
        {this.state.showPredictions && (
          <View style={styles.predictionsContainer}>{predictions}</View>
        )}
      </View>
    );
  }
}
export default connect(
  null,
  { setCurrentRegion }
)(AutoFillMapSearch);

const text = {
  prediction: {
    fontWeight: "100"
  }
};
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
    borderTopWidth: 0.5
  },
  predictionsContainer: {
    borderTopWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -5
  }
};

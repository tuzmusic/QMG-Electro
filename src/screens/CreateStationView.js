import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { BLText } from "../components/StyledComponents";
import { Input, Button, Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { createStation } from "../redux/actions/writeActions";
import { setCurrentStationID } from "../redux/actions/readActions";
import { GoogleAPIKey } from "../../secrets";
import Sugar from "sugar";
Sugar.extend();
import AppStyles from "../constants/Styles";
import _ from "lodash";

function ControlledInput(props) {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      <Input
        style={[{ fontFamily: AppStyles.font }, props.inputStyle, styles.input]}
        placeholder={props.placeholder || props.propName.titleize()}
        label={
          this.state[props.propName] !== "" &&
          (props.placeholder || props.propName.titleize())
        }
        value={this.state[props.propName]}
        errorMessage={props.errorMessage}
        onBlur={props.onBlur}
        onChangeText={
          props.onChangeText ||
          (value => this.setState({ [props.propName]: value }))
        }
        keyboardType={props.keyboardType}
        textAlign={props.textAlign}
        multiline={props.multiline}
        numberOfLines={5} // android only, eh?
      />
    </View>
  );
}

class CreateStationView extends Component {
  static navigationOptions = { headerTitle: "New Station" };
  // componentDidMount = () => this.setPlaceholders()

  setPlaceholders() {
    this.setState({
      title: "*** App Submitted Station ***",
      address: "88 N Spring St 03301",
      content: "This station is awesome",
      website: "www.station.com",
      tagline: "The best!",
      priceFrom: "100",
      priceTo: "200",
      contactEmail: "me@place.com",
      contactPhone: "444-333-1111",
      amenities: "60"
    });
  }

  state = {
    title: "",
    address: "",
    content: "",
    website: "",
    tagline: "",
    priceFrom: "",
    priceTo: "",
    contactEmail: "",
    contactPhone: "",
    amenities: "",
    addressPredictions: [],
    showPredictions: false,
    location: null
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

  async setAddress(prediction) {
    this.setState({ address: prediction.description, showPredictions: false });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleAPIKey}&placeid=${
      prediction.place_id
    }&fields=geometry`;
    try {
      const result = await fetch(url);
      const json = await result.json();
      this.setState({ location: json.result.geometry.location });
    } catch (err) {
      console.error(err);
    }
  }

  handleSubmit = () => {
    const station = this.props.createStation(this.state);
    this.props.setCurrentStationID(station.id);
    this.props.navigation.navigate("ListScreen");
    this.props.navigation.navigate("StationDetail", { title: station.title });
  };

  render() {
    const predictions = this.state.addressPredictions.map(prediction => (
      <TouchableOpacity
        style={styles.prediction}
        key={prediction.id}
        onPress={this.setAddress.bind(this, prediction)}
      >
        <Text style={text.unformatted}>{prediction.description}</Text>
      </TouchableOpacity>
    ));

    // TO-DO: Fix issue where multiline inputs don't avoid the keyboard. See https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/227 (and others on Google, probably)
    return (
      <KeyboardAwareScrollView>
        <View style={styles.textContainer}>
          {ControlledInput.call(this, { propName: "title" })}
          {ControlledInput.call(this, {
            propName: "address",
            // onBlur: () => this.setState({ showPredictions: false }),
            onChangeText: searchText => {
              this.setState(
                { address: searchText, showPredictions: true },
                _.debounce(this.handleAddressChange.bind(this), 800)
              );
            }
          })}
          <View style={styles.predictionsContainer}>
            {this.state.showPredictions ? predictions : null}
          </View>

          <Divider style={[styles.divider, styles.invisible]} />

          {ControlledInput.call(this, {
            propName: "contactEmail",
            keyboardType: "email-address"
          })}
          {ControlledInput.call(this, {
            propName: "contactPhone",
            keyboardType: "phone-pad"
          })}
          {ControlledInput.call(this, { propName: "website" })}

          <Divider style={[styles.divider, styles.invisible]} />

          <View style={styles.rowContainer}>
            {ControlledInput.call(this, {
              propName: "priceFrom",
              containerStyle: styles.rowElement,
              keyboardType: "numeric",
            })}
            {ControlledInput.call(this, {
              propName: "priceTo",
              containerStyle: styles.rowElement,
              keyboardType: "numeric",
            })}
          </View>
          {ControlledInput.call(this, {
            propName: "amenities",
            multiline: false,
            keyboardType: "number-pad"
          })}
          <BLText style={text.note}>
            (this will have to be checkboxes or something)
          </BLText>
          <Button
            style={styles.button}
            title="Upload Photo"
            onPress={() => {}}
          />

          <Divider style={[styles.divider, styles.invisible]} />

          {ControlledInput.call(this, {
            propName: "content",
            placeholder: "Description",
            multiline: false
            // containerStyle: { height: 100, justifyContent: "flex-end" }
          })}
          <Button
            title="Submit"
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({
    stations: state.main.stations
  }),
  { createStation, setCurrentStationID }
)(CreateStationView);

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
  note: { textAlign: "center", fontStyle: "italic" },
  unformatted: {
    fontFamily: null
  }
};

const styles = {
  input: {
    fontFamily: AppStyles.font
  },
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
  },
  invisible: {
    backgroundColor: "transparent"
  },
  prediction: {
    padding: 2,
    margin: 2,
    marginLeft: 3,
    marginRight: 3,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5
  },
  predictionsContainer: {
    borderColor: "lightgrey",
    borderWidth: 0.5,
    borderTopWidth: 0,
    marginLeft: 15,
    marginRight: 15,
    marginTop: -5
  }
};

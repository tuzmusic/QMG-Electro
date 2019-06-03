import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

class CreateStationView extends Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.user) this.props.navigation.navigate("Auth");
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={styles.logout}
          containerStyle={styles.button}
          color="red"
          titleStyle={styles.text}
          onPress={async () => await this.props.logout()}
          title="Log Out"
          loading={this.props.isLoading}
          disabled={this.props.isLoading}
        />

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("http://joinelectro.com/submit-listings/")
          }
        >
          <Text style={styles.link}>
            Please visit the website to create a station.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user, isLoading: state.auth.isLoading }),
  { logout }
)(CreateStationView);

const styles = {
  button: { width: "65%" },
  logout: { backgroundColor: "red" },
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "flow-start",
    alignItems: "center"
  },
  text: {
    fontSize: 24
  },
  link: {
    fontSize: 24,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    margin: 60
  }
};

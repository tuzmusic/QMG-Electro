import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { AsyncStorage } from "react-native";

class CreateStationView extends Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.user) this.props.navigation.navigate("Auth");
  }

  async performLogout() {
    console.log("Logging out");

    await AsyncStorage.setItem("electro_logged_in_user", "");
    const storage = await AsyncStorage.getItem("electro_logged_in_user");
    console.log(" newly logged out user has been saved as:", storage);
    await this.props.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.user &&
            "Logged in as " +
              (this.props.user.username || this.props.user.user.username)}
        </Text>
        <Button
          buttonStyle={styles.logout}
          containerStyle={styles.button}
          color="red"
          titleStyle={styles.text}
          onPress={this.performLogout.bind(this)}
          title="Log Out"
          loading={this.props.isLoading}
          disabled={this.props.isLoading}
        />

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("http://joinelectro.com/submit-listings/")
          }
        >
          <Text style={[styles.text, { margin: 40, textAlign: "center" }]}>
            Please <Text style={styles.link}>visit the website</Text> to create
            a station.
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
    padding: 30,
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

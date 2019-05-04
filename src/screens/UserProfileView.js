import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

import UserProfile from "../subviews/UserProfile";

const LogoutButton = props => (
  <Button
    title="Log Out"
    containerStyle={{ width: "100%", padding: 20 }}
    buttonStyle={{ backgroundColor: "red" }}
    onPress={props.onPress}
  />
);

const DividerView = props => (
  <View style={[styles.dividerContainer]}>
    <Divider style={styles.divider} />
  </View>
);

class UserProfileView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  componentDidMount = () => {
    this.props.navigation.setParams({
      title: this.props.user.username
    });
  };

  logOut() {
    this.props.navigation.navigate("Auth");
    this.props.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <UserProfile user={this.props.user} />
        <LogoutButton onPress={this.logOut.bind(this)} />
        <DividerView />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(UserProfileView);

const styles = F8StyleSheet.create({
  avatar: { padding: 20 },
  dividerContainer: {
    width: "100%"
  },
  divider: {
    margin: 15,
    height: 0.75,
    backgroundColor: "darkgrey"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  }
});

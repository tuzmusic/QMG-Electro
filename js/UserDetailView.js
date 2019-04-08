import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";

class UserDetailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "User Detail"
  });

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.user.username} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.main.userInQuestion
});

export default connect(mapStateToProps)(UserDetailView);

styles = F8StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

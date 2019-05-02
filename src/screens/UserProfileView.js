import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";

class UserProfileView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  componentDidMount = () => {
    this.props.navigation.setParams({
      title: this.props.user.username
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.user.username} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UserProfileView);

styles = F8StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

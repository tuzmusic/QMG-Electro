import React, { Component } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
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
    const {user} = this.props
    return (
      <View style={styles.container}>
        <Avatar
          rounded
          containerStyle={styles.avatar}
          size={"xlarge"}
          title={user.username[0].toUpperCase()}
        />
        <Text style={text.username}> {user.username} </Text>
        <Text style={text.body}>{user.fullName || "(No name provided)"}</Text>
        <Text style={text.body}>{"Email: "+ (user.email || "(No email address provided)")}</Text>
        <Text style={text.body}>{"Phone: "+ (user.phone || "(No phone number provided)")}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UserProfileView);

const baseSize = 16;
const text = {
  body: {
    padding: 10,
    fontSize: baseSize
  },
  username: {
    fontSize: baseSize + 10,
    fontWeight: 'bold',
  }
};

const styles = F8StyleSheet.create({
  avatar: { padding: 20 },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  }
});

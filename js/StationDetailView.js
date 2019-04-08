import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";

class StationDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.props.station.name} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  station: state.main.currentStation
});

export default connect(mapStateToProps)(StationDetailView);

styles = F8StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

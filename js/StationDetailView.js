import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";
import Station from "../models/Station";

class StationDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {Object.entries(this.props.station).map((k,i) => (
          <Text key={i} style={{padding:5}}>{`${k}`.replace(",", ": ")}</Text>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  station: new Station(state.main.currentStation)
  // station: state.main.currentStation
});

export default connect(mapStateToProps)(StationDetailView);

styles = F8StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});

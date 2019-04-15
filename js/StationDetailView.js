import React, { Component } from "react";
import { Text, View } from "react-native";
import { Image } from "react-native-elements";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";
import { getImageForStation } from "../actions/mainActions";

const CellTextRow = props => (
  <Text style={[{ padding: 1, textAlign: "left" }, props.style]}>
    {props.children}
  </Text>
);

class StationDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  async componentDidMount() {
    if (!this.props.station.imageURL) {
      try {
        // await this.props.getImageForStation(this.props.station);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  render() {
    station = this.props.station;

    return (
      <View style={styles.container}>
        <Image source={{ uri: station.imageURL }} />
        <CellTextRow style={text.name}>{station.title}</CellTextRow>
        <CellTextRow>Image URL: {station.imageURL}</CellTextRow>

        {/* {Object.entries(station).map((k, i) => (
          <Text key={i} style={{ padding: 5 }}>
            {`${k}`.replace(",", ": ")}
          </Text>
        ))} */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  station: state.main.currentStation
});

export default connect(
  mapStateToProps,
  { getImageForStation }
)(StationDetailView);

const text = F8StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  caption: {
    textAlign: "center"
  }
});

const styles = F8StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  title: { fontWeight: "bold" }
});

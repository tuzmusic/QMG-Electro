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
    console.log("station", station.title, "mounted");
    if (!this.props.station.imageURL) {
      try {
        await this.props.getImageForStation(this.props.station);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  render() {
    station = this.props.station;
    console.log("rendering station", station.title);
    const logo = (
      <Image
        style={[styles.image]}
        source={require("../assets/logos/BOLTIcon.jpg")}
      />
    );

    return (
      <View style={[styles.container]}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.bordered, styles.image]}
            source={{ uri: station.imageURL }}
            PlaceholderContent={logo}
          />
        </View>
        <View style={styles.textContainer}>
          <CellTextRow style={text.title}>{station.title}</CellTextRow>
          <CellTextRow>Image URL: {station.imageURL}</CellTextRow>
        </View>

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
  station: state.main.stations[state.main.currentStationID],
  stations: state.main.stations
});

export default connect(
  mapStateToProps,
  { getImageForStation }
)(StationDetailView);

const text = F8StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18
  },
  caption: {
    textAlign: "center"
  }
});

const styles = F8StyleSheet.create({
  bordered: {
    borderColor: "black",
    borderWidth: 1
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  imageContainer: { alignItems: "center" },
  textContainer: { alignItems: "flex-start" },
  image: {
    height: 300,
    width: 300,
    resizeMode: "contain"
  }
});

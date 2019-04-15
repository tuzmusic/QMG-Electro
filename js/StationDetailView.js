import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "react-native-elements";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";
import { getImageForStation } from "../actions/mainActions";
import { MaterialIndicator } from "react-native-indicators";
import HTML from "react-native-render-html";

const CellTextRow = props => (
  <Text style={[{ padding: 2, textAlign: "left" }, props.style]}>
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

    return (
      <View style={[styles.container]}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image]}
            source={{ uri: station.imageURL }}
            PlaceholderContent={<MaterialIndicator color={"blue"} />}
          />
        </View>
        <ScrollView contentContainerStyle={styles.textContainer}>
          <CellTextRow style={text.title}>{station.title}</CellTextRow>
          <CellTextRow style={text.address}>{station.address}</CellTextRow>
          <CellTextRow style={text.website}>{station.website}</CellTextRow>
          <HTML style={text.content} html={station.content}/>
        </ScrollView>
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

const baseSize = 16;
const text = F8StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24
  },
  address: {
    fontSize: baseSize
  },
  content: {
    fontSize: baseSize
  },
  website: {
    fontSize: baseSize
  }
});

const styles = F8StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
    // justifyContent: "flex-start",
    // alignItems: "flex-start"
  },
  imageContainer: {
    // flex: 1,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0
  },
  textContainer: { alignItems: "flex-start", padding: 15 },
  image: {
    height: 350,
    width: null,
    resizeMode: "cover"
  },
  bordered: {
    borderColor: "black",
    borderWidth: 1
  }
});

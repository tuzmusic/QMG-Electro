import React, { Component } from "react";
import { Text, View } from "react-native";
import F8StyleSheet from "../js/F8StyleSheet";
import { connect } from "react-redux";
import Station from "../models/Station";

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

  getImage() {
    if ((url = this.props.station.mediaDataURL)) {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({
            imageURL: json.media_details.sizes.thumbnail.source_url
          }, () => console.log("thumbnail imageURL:", this.state.imageURL));
        });
    }
  }

  componentDidMount = () => {
    this.getImage()  
  };
  
  render() {
    return (
      <View style={styles.container}>
        <CellTextRow style={text.name}>{this.props.station.title}</CellTextRow>

        {/* {Object.entries(this.props.station).map((k, i) => (
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

export default connect(mapStateToProps)(StationDetailView);

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

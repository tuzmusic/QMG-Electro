import React, { Component } from "react";
import { BLText } from "../components/StyledComponents";
import {
  ScrollView,
  View,
  Linking,
  TouchableOpacity,
  Platform
} from "react-native";
import { Image, Avatar, Button } from "react-native-elements";
import F8StyleSheet from "../components/F8StyleSheet";
import { connect } from "react-redux";
import {
  getImageURLForStation,
  deleteStation
} from "../redux/actions/stationActions";
import { MaterialIndicator } from "react-native-indicators";

const CellTextRow = props => (
  <BLText style={[{ padding: 2, textAlign: "left" }, props.style]}>
    {props.children}
  </BLText>
);

const Spinner = <MaterialIndicator color={"blue"} />;

function openURL(url) {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error("An error occurred", err));
}

function openMap(address) {
  let baseURL = "https://www.google.com/maps/search/?api=1&query=";
  // if (Platform.OS === 'ios') baseURL = "http://maps.apple.com/?q="
  openURL(baseURL + address);
}

const StationWebsite = ({ station }) => {
  if (station.website) {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(station.website)}>
        <CellTextRow style={[text.address, text.link]}>
          {station.website}
        </CellTextRow>
      </TouchableOpacity>
    );
  }
  return null;
};

const StationImage = ({ station }) => {
  if (station.mediaDataURL || station.imageURL) {
    return (
      <Image
        style={[styles.image, { resizeMode: "cover" }]}
        source={{ uri: station.imageURL }}
        PlaceholderContent={Spinner}
      />
    );
  } else {
    return (
      <View style={[styles.centered, styles.image]}>
        <BLText>No Image Provided</BLText>
      </View>
    );
  }
};

const ContactIcon = props => {
  return (
    <Avatar
      rounded
      size="medium"
      activeOpacity={0.5}
      icon={props.icon}
      onPress={props.onPress}
      containerStyle={styles.icon}
    />
  );
};

const ContactButtons = ({ station }) => {
  return (
    <View style={[styles.iconCell]}>
      {station.contactEmail ? (
        <ContactIcon
          icon={{ name: "email-outline", type: "material-community" }}
          onPress={() => openURL(`mailto:${station.contactEmail}`)}
        />
      ) : null}
      {station.contactPhone ? (
        <ContactIcon
          icon={{ name: "phone", type: "feather" }}
          onPress={() => openURL(`tel:${station.contactPhone}`)}
        />
      ) : null}
    </View>
  );
};

class StationDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  async componentDidMount() {
    if (!this.props.station.imageURL) {
      try {
        await this.props.getImageURLForStation(this.props.station);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async onDelete() {
    this.props.navigation.navigate("ListScreen");
    this.props.deleteStation(this.props.station);
  }

  render() {
    if (!this.props.station) return null;
    const { station, users } = this.props;

    const user = users[station.userID];
    return (
      <ScrollView>
        <View style={styles.imageContainer}>
          <StationImage station={station} />
        </View>

        <View style={styles.textContainer}>
          {/* Title */}
          <CellTextRow style={text.title}>{station.title}</CellTextRow>
          {/* Address */}
          <TouchableOpacity onPress={openMap.bind(null, station.address)}>
            <CellTextRow style={[text.address, text.link]}>
              {station.address}
            </CellTextRow>
          </TouchableOpacity>
          {/* Website */}
          <StationWebsite station={station} />
          <CellTextRow style={[text.address]}>
            {station.contactEmail}
          </CellTextRow>
          <CellTextRow style={[text.address]}>
            {station.contactPhone}
          </CellTextRow>
          <ContactButtons station={station} />
          {/* Price */}
          <CellTextRow style={[text.price]}>
            {station.priceFrom && station.priceTo
              ? `Price range: ${isNaN(station.priceFrom) ? "" : "$"}${
                  station.priceFrom
                }-${isNaN(station.priceTo) ? "" : "$"}${station.priceTo}`
              : "Free charging!"}
          </CellTextRow>
          {/* Description */}
          <CellTextRow style={[text.content, { paddingTop: 20 }]}>
            {station.content.replace("<p>", "").replace("</p>", "")}
          </CellTextRow>
          <View style={styles.buttonContainer}>
            <Button
              title="Delete Listing"
              containerStyle={{ width: "100%" }}
              buttonStyle={{ backgroundColor: "red" }}
              onPress={this.onDelete.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  station: state.main.stations[state.main.currentStationID],
  stations: state.main.stations,
  users: state.auth.users
});

export default connect(
  mapStateToProps,
  { getImageURLForStation, deleteStation }
)(StationDetailView);

const baseSize = 17;
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
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  price: {
    fontSize: baseSize + 4,
    textAlign: "center",
    width: "100%"
  }
});

const styles = F8StyleSheet.create({
  buttonContainer: {
    padding: 10,
    width: "100%",
    alignItems: "center"
  },
  infoCell: {
    flex: 2
  },
  iconCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    width: "100%"
  },
  icon: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 5,
    marginBottom: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imageContainer: {
    backgroundColor: "lightgrey"
  },
  textContainer: { alignItems: "flex-start", padding: 15 },
  image: {
    height: 350,
    width: null
  },
  bordered: {
    borderColor: "black",
    borderWidth: 1
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
});

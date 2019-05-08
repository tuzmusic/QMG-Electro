import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Button } from "react-native-elements";

export default (CreateStationView = props => {
  return (
    <View style={styles.container}>
      <Button
        containerStyle={{ width: "65%" }}
        titleStyle={styles.text}
        onPress={() =>
          Linking.openURL("http://joinelectro.com/submit-listings/")
        }
        title="Please visit the website to create a station."
      />
    </View>
  );
});

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24
  }
};

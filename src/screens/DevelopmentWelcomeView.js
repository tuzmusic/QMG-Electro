import React from "react";
import { Text, View, ScrollView, Button } from "react-native";
import { ThemeProvider } from "react-native-elements";

const styles = {
  text: {
    fontSize: 18,
    padding: 5,
    paddingTop: 15
  },
  bug: { paddingLeft: 25 }
};

const WelcomeView = props => (
  <ScrollView
    contentContainerStyle={{ flex: 1, justifyContent: "center", padding: 10 }}
  >
    <Text style={{ textAlign: "center", fontSize: 24 }}>
      Welcome to the latest version of ELECTRO
    </Text>
    <Text style={styles.text}>
      The Login screen is just a dummy implementation. Enter a new username, or
      select a previous username if you've made one. This doesn't connect to any
      database (or, of course, authenticate with a password). Login will always
      succeed.
    </Text>
    <Text style={styles.text}>
      This development edition downloads stations from joinelectro.com, and also
      includes some mock stations located around Apple HQ in Cupertino, CA.
    </Text>
    <Text style={styles.text}>
      You can hit the Cupertino button in the lower-right corner of the map to
      go directly to Cupertino and see the mock stations.
    </Text>
    <Text style={styles.text}>Some bugs to expect:</Text>
    <Text style={[styles.text, styles.bug]}>
      Search region only changes when searching a location from the map, or
      hitting the "Find Me" button. (not when moving or zooming the map
      manually)
    </Text>
    <Text style={[styles.text, styles.bug]}>
      Pressing a station on the map will not automatically move the station's
      marker into ScrollView.
    </Text>
    <Text style={[styles.text, styles.bug]}>
      Some website-created stations may not register on the map. (This is
      actually a bug with the website.)
    </Text>
    <Button
      style={styles.text}
      title="Let's Go!"
      onPress={() => props.navigation.navigate("Auth")}
    />
  </ScrollView>
);

export default WelcomeView;

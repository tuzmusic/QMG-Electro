import React from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { DotIndicator } from "react-native-indicators";

const LoadingIndicator = ({ isVisible, message }) => (
  <Overlay
    containerStyle={styles.modal}
    height={200}
    width={200}
    isVisible={isVisible}
    style={styles.modal}
    borderRadius={20}
    overlayBackgroundColor={"lightblue"}
  >
    <View style={styles.modalContainer}>
      <DotIndicator color={"darkgrey"} />
      <Text>{message}</Text>
    </View>
  </Overlay>
);

export default LoadingIndicator;

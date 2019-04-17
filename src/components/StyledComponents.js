import React from "react";
import { Text } from "react-native";

export const BLText = props => (
  <Text style={[{ letterSpacing: 1}, props.style]}>{props.children}</Text>
);

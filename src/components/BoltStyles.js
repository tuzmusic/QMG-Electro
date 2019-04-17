import React, { Component } from "react";
import { Text } from "react-native";

export const BLText = props => {
  return (
    <Text style={[{ fontFamily: "Avenir" }, props.style]}>{props.children}</Text>
  );
};

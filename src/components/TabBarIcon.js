import React from "react";
import * as Icon from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default class TabBarIcon extends React.Component {
  render() {
    switch (this.props.library) {
      case "FontAwesome":
        return (
          <Icon.FontAwesome
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
      default:
        return (
          <Icon.Ionicons
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={
              this.props.focused
                ? Colors.tabIconSelected
                : Colors.tabIconDefault
            }
          />
        );
    }
  }
}

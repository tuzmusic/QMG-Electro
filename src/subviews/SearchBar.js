import React, { Component } from "react";
import { TextInput } from "react-native";

export default class SearchBar extends Component {
  state = {
    searchText: ""
  };

  render() {
    return (
      <TextInput
        onChangeText={searchText => this.setState({ searchText })}
        value={this.state.searchText}
        style={this.props.style}
        placeholder={"Search"}
      />
    );
  }
}

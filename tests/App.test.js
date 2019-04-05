import React from "react";
import { shallow, mount } from "enzyme";
import './setup-tests'
import TabNavigator from "../navigation/MainTabNavigator";
import TabBarIcon from "../components/TabBarIcon";

describe("AppNavigator", () => {
  it("should render tab bar icons", () => {
    const wrapper = mount(<TabNavigator />);
    expect(wrapper.find(<TabBarIcon/>).length).toEqual(2);
  });
});
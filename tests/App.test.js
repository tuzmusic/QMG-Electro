import React from "react";
import { shallow } from "enzyme";
import './setup-tests'
import TabNavigator from "../navigation/MainTabNavigator";
import TabBarIcon from "../components/TabBarIcon";

describe("AppNavigator", () => {
  it("should render tab bar icons", () => {
    const wrapper = shallow(<TabNavigator />);
    expect(wrapper.find(TabBarIcon).length).toEqual(2);
  });
});

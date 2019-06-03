import React from "react";
import renderer from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import LoginView from "../src/screens/LoginView";
// import SimpleView from "./__mocks__/SimpleView";

describe("LoginView", () => {
  const wrapper = mount(<LoginView />);
  // const wrapper = mount(<SimpleView />);

  it("can get through the damn test file", () => {
    expect(true).toBe(true);
  });
});

import React from "react";

// Tests
import { shallow, mount } from "enzyme";
import "./setup-tests";
import { createMockStore } from "redux-test-utils";
import shallowWithStore from "./shallowWithStore";

//Components
import MapResultsView, { MapResultsViewBasic } from "../js/MapResultsView";

describe("MapResultsView", () => {
  it("is an object", () => {
    const station = {
      address: "42 N Main St, Concord, NH 03301",
      name: "The Works",
      owner: {
        username: "tesladude"
      },
      price: 0,
      availableNow: false
    };
    const testState = {
      main: {
        stations: [station]
      }
    };
    const store = createMockStore(testState);
    // let component = shallowWithStore(<MapResultsView />, store);
    component = shallow(<MapResultsViewBasic station={station} />);
    expect(component).to.be.a("object");
  });
});

import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import jsdom from "jsdom";

import "react-native";
import "jest-enzyme";

function setUpDomEnvironment() {
  const { JSDOM } = jsdom;
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost/"
  });
  const { window } = dom;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: "node.js"
  };
  copyProps(window, global);
}

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

setUpDomEnvironment();

configure({ adapter: new Adapter() });

// import MockAsyncStorage from "mock-async-storage";

// const mockAsync = new MockAsyncStorage();
// jest.mock("react-native", () => ({ASyncStorage: mockAsync}));

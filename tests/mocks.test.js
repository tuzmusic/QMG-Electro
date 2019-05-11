import * as actions from "./__mocks__/someMocks";

describe("actions", () => {
  xit("calls_f1 should call f1", () => {
    actions.f1 = jest.fn();
    actions.calls_f1();
    expect(actions.f1).toBeCalled(); // Success!
  });
});

import * as ReactNative from "react-native";
import { AsyncStorage } from "react-native";

// AsyncStorage = jest.fn();

jest.mock("react-native", () => ({
  AsyncStorage: {
    setItem: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }),
    multiSet: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }),
    getItem: jest.fn(() => {
      return new Promise((resolve, reject) => {
        // resolve(JSON.stringify(getTestData()));
        resolve("JSON.stringify(getTestData())");
      });
    }),
    multiGet: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve("multiGetTestData()");
      });
    }),
    removeItem: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }),
    getAllKeys: jest.fn(() => {
      return new Promise(resolve => {
        resolve(["one", "two", "three"]);
      });
    })
  }
}));

describe("AsyncStorage", () => {
  it("works", async () => {
    expect(await AsyncStorage.getAllKeys()).toEqual(["one", "two", "three"]);
    expect(await AsyncStorage.getItem("electro_stations")).toEqual(
      "JSON.stringify(getTestData())"
    );
  });
});

import { _getCachedStations } from "../src/redux/actions/stationActions";

describe("getCachedStations", () => {
  it("calls AsyncStorage", () => {
    expect(AsyncStorage.getItem).toBeCalled();
    _getCachedStations();
  });
});

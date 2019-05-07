import "react-native";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import MockAsyncStorage from "mock-async-storage";
import fetchMock from "fetch-mock";
import Station from "../src/models/Station";
import * as actions from "../src/redux/actions/stationActions";

const mockStore = configureMockStore([thunk]);
const store = mockStore({ main: { stations: [] } });

import stationsMock from "./mocks/apiResponse.js";

describe("stationsMock", () => {
  it("is an array of JSON objects", () => {
    expect(stationsMock.length).toEqual(1);
    expect(stationsMock[0].id).toEqual(850);
  });
});

describe("_downloadStations", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  fetchMock.mock("http://joinelectro.com/wp-json/wp/v2/job-listings/", stationsMock);

  const firstStation = stationsMock[0];
  const expectedReturn = {
    [firstStation.id]: Station.createFromApiResponse(firstStation)
  };

  it("returns stations on success", async () => {
    const response = (await actions._downloadStations()).stations
    expect(response).toEqual(expectedReturn);
  });
});

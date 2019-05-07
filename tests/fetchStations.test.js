import "react-native";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";
import MockAsyncStorage from "mock-async-storage";
import fetchMock from "fetch-mock";
import Station from "../src/models/Station";
import * as actions from "../src/redux/actions/stationActions";
import stationsMock from "./mocks/apiResponse.js";

const mockStore = configureMockStore([thunk]);

describe("stationsMock", () => {
  it("is an array of JSON objects", () => {
    expect(stationsMock.length).toEqual(1);
    expect(stationsMock[0].id).toEqual(850);
  });
});

describe("async fetching actions", () => {
  fetchMock.mock(
    "http://joinelectro.com/wp-json/wp/v2/job-listings/",
    stationsMock
  );

  const firstStation = stationsMock[0];
  const downloadedResponse = {
    [firstStation.id]: Station.createFromApiResponse(firstStation)
  };

  describe("fetchStations(shouldDownload)", () => {
    it("dispatches stations", () => {
      const expectedActions = [
        { type: "GET_STATIONS_START" },
        { type: "GET_STATIONS_SUCCESS", stations: downloadedResponse }
      ];
      const store = mockStore({ main: { stations: [] } });

      return store
        .dispatch(actions.fetchStations({ shouldDownload: true }))
        .then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});

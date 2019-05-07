// Redux
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

// API Fetching
import fetchMock from "fetch-mock";
import apiResponse from "./__mocks__/apiResponse.js";

// My Code
import Station from "../src/models/Station";
import * as actions from "../src/redux/actions/stationActions";

const mockStore = configureMockStore([thunk]);

describe("stationsMock", () => {
  it("is an array of JSON objects", () => {
    expect(apiResponse.length).toEqual(1);
    expect(apiResponse[0].id).toEqual(850);
  });
});

// AsyncStorage
import "react-native";
import MockAsyncStorage from "mock-async-storage";

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock("AsyncStorage", () => mockImpl);
};

mock();

import { AsyncStorage as storage } from "react-native";

describe("async fetching actions", () => {
  fetchMock.mock(
    "http://joinelectro.com/wp-json/wp/v2/job-listings/",
    apiResponse
  );

  const firstStation = apiResponse[0];
  const downloadedResponse = {
    [firstStation.id]: Station.createFromApiResponse(firstStation)
  };
  const imageUpdateResponse = {firstStation, }
  const expectedActions = {
    ["get"]: [
      { type: "GET_STATIONS_START" },
      { type: "GET_STATIONS_SUCCESS", stations: downloadedResponse }
    ],
    ["update"]: [
      { type: "GET_STATIONS_SUCCESS", station: imageUpdateResponse }
    ]
  };

  describe('getImageForStation', () => {
    it('should get the imageURL for a station', () => {
      
    });
  });


  describe("fetchStations(shouldDownload)", () => {
    it("gets stations from the website and dispatches them to the store", () => {
      const store = mockStore({ main: { stations: [] } });

      return store
        .dispatch(actions.fetchStations({ shouldDownload: true }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions.get);
        });
    });
  });

  describe("fetchStations(useCache)", () => {
    /* it("gets stations from the local storage and dispatches them to the store", () => {
      const cachedResponse = "I don't know yet!!!";
    
      const expectedActions = [
        { type: "GET_STATIONS_START" },
        { type: "GET_STATIONS_SUCCESS", stations: cachedResponse }
      ];
    
      const store = mockStore({ main: { stations: [] } });
    
      return store
        .dispatch(actions.fetchStations({ useCache: true }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    }); */
  });
});

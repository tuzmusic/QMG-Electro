import reducer from "../src/redux/reducers/mainReducer";

describe("set user location", () => {
  const action = {
    type: "SET_USER_LOCATION",
    location: {
      speed: 0,
      longitude: -122.0312186,
      latitude: 37.33233141,
      accuracy: 5,
      heading: -1,
      altitude: 0,
      altitudeAccuracy: -1
    }
  };

  const expectedState = {
    currentRegion: {
      speed: 0,
      longitude: -122.0312186,
      latitude: 37.33233141,
      accuracy: 5,
      heading: -1,
      altitude: 0,
      altitudeAccuracy: -1
    }
  };
  it("should return the state with the new location", () => {
    const returnedState = reducer([], action)
    expect(returnedState).toEqual(expectedState);
  });
});

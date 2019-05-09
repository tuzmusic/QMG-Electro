import reducer from "../src/redux/reducers/mainReducer";
import { setCurrentRegion } from "../src/redux/actions/userActions";

describe("setCurrentRegion", () => {
  const inputCoords = {
    coords: {
      speed: 0,
      longitude: -122.0312186,
      latitude: 37.33233141,
      accuracy: 5,
      heading: -1,
      altitude: 0,
      altitudeAccuracy: -1
    }
  };

  const outputAction = {
    type: "SET_CURRENT_REGION",
    region: {
      latitude: 37.33233141,
      longitude: -122.0312186,
      latitudeDelta: 0.044915558749550846,
      longitudeDelta: -5.737702242408728
    }
  };
  it('takes an object containing an "accuracy" with a key of "coords" and returns and action with an object containing lat/long delta', () => {
    expect(setCurrentRegion(inputCoords)).toEqual(outputAction)
  });
});

describe("set user location", () => {
  const action = {
    type: "SET_CURRENT_REGION",
    region: {
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
    const returnedState = reducer([], action);
    expect(returnedState).toEqual(expectedState);
  });
});

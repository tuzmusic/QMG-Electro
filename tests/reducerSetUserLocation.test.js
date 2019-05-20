import reducer from "../src/redux/reducers/mainReducer";
import { setCurrentRegion } from "../src/redux/actions/locationActions";

describe("setCurrentRegion", () => {
  const inputCoords = {
    coords: {
      longitude: -122.0312186,
      latitude: 37.33233141,
      accuracy: 5
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
  xit('takes an object containing an "accuracy" with a key of "coords" and returns and action with an object containing lat/long delta', () => {
    expect(setCurrentRegion(inputCoords)).toEqual(outputAction);
  });
  const simulatorLocation = {
    latitude: 37.33233141,
    longitude: -122.0312186
  };
  const calculatedSimulatorLocation = {
    latitude: 37.33233141,
    latitudeDelta: 0.0004491555874955085,
    longitude: -122.0312186,
    longitudeDelta: -0.05737702242408729
  };

  // SEARCH APPLE INFINITE LOOP INSTEAD
  // Although maybe the delta should be the same for every accuracy???
  // Using a calculator, the longitude delta for this object is around -0.05!
  // Calculation implies this accuracy: 2.531958973632515
  const precalculatedSearchedCupertino = {
    accuracy: 0.05,
    latitude: 37.3229978,
    longitude: -122.0321823
  };
  const calculatedSearchedCupertino = {
    accuracy: 0.05,
    latitude: 37.3229978,
    latitudeDelta: 0.0004491555874955085,
    longitude: -122.0321823,
    longitudeDelta: -2.618546275831898
  };

  it("returns the same zoom level for searching Cupertino as for ", () => {
    expect(
      setCurrentRegion(simnulatorLocation).toEqual(
        setCurrentRegion(precalculatedSearchedCupertino)
      )
    );
  });
});

describe("set user location", () => {
  c;
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
  xit("should return the state with the new location", () => {
    const returnedState = reducer([], action);
    expect(returnedState).toEqual(expectedState);
  });
});

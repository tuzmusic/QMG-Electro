import Station, { distanceBetween } from "../src/models/Station";
import CupertinoStations from "./__mocks__/CupertinoStations";
import reducer from "../src/redux/reducers/mainReducer";

describe("mocking stations into reducer", () => {
  const initialState = { stations: CupertinoStations };
  const returnedState = reducer(initialState, {});

  it("can take the mock file as stations", () => {
    expect(Object.keys(returnedState.stations)[0]).toEqual("1"); // testing the testing
  });
});

describe("Station.distanceFrom", () => {
  const station1 = new Station(CupertinoStations[1]); // De Anza
  const station2 = new Station(CupertinoStations[4]); // Google HQ
  const location = CupertinoStations[4].location; // Google HQ

  it("distanceBetween returns the distance between two locations", () => {
    expect(
      distanceBetween(
        CupertinoStations[1].location,
        CupertinoStations[4].location
      )
    ).toEqual(7.21);
  });

  it("Station.Prototype.distanceFrom(station) returns the distance between two stations, in miles", () => {
    expect(station1.distanceFrom(station2)).toEqual(7.21);
  });

  it("Station.Prototype.distanceFromLocation(location) returns the distance between a station and a location, in miles", () => {
    expect(station1.distanceFromLocation(location)).toEqual(7.21);
  });
});

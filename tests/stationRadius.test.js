import CupertinoStations from "./__mocks__/CupertinoStations";
import reducer from "../src/redux/reducers/mainReducer";

describe("mocking stations into reducer", () => {
  const initialState = { stations: CupertinoStations };
  const returnedState = reducer(initialState, {});

  it("can take the mock file as stations", () => {
    expect(Object.keys(returnedState.stations)[0]).toEqual("1"); // testing the testing
  });
});
